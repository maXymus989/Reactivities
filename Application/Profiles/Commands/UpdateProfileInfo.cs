using System;
using Application.Activities.Profiles.DTOs;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class UpdateProfileInfo
{
    public class Command : IRequest<Result<Unit>>
    {
        public EditProfileDTO? UpdatedProfile { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            if(request.UpdatedProfile == null) return Result<Unit>.Failure("No user profile provided", 400);

            var user = await userAccessor.GetUserAsync();

            var userRecord = await context.Users.FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken);

            mapper.Map(request.UpdatedProfile, userRecord);

            context.Entry(user).State = EntityState.Modified;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if(!result) return Result<Unit>.Failure("Updating user went wrong", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
