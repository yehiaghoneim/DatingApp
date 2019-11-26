using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Model;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>()
                .ForMember(des => des.PhotoUrl, opt => {
                   opt.MapFrom (src =>  src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }).ForMember(des=>des.Age,opt=>
            opt.ResolveUsing(d=>d.DateOfBirth.CalculateAge()));

            CreateMap<User,UserForDetailedDto>()
                .ForMember(des => des.PhotoUrl, opt => {
                   opt.MapFrom (src =>  src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }).ForMember(des=>des.Age,opt=>
            opt.ResolveUsing(d=>d.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();

        }
    }
}