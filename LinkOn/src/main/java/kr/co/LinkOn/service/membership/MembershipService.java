package kr.co.LinkOn.service.membership;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.LinkOn.dto.membership.MembershipDTO;
import kr.co.LinkOn.entity.membership.Membership;
import kr.co.LinkOn.repository.membership.MembershipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final ModelMapper modelMapper;
    private final HttpServletRequest request;

    public List<MembershipDTO> getAllMemberships() {

        // 1. 모든 Membership 엔티티 조회
        List<Membership> memberships = membershipRepository.findAll(); // 모든 엔티티를 가져오는 JPA 메서드

        // 2. 엔티티 리스트를 DTO 리스트로 변환
        List<MembershipDTO> membershipDTOs = memberships.stream()
                .map(membership -> modelMapper.map(membership, MembershipDTO.class))
                .collect(Collectors.toList());

        log.info("Found {} membership plans.", membershipDTOs.size());
        return membershipDTOs;
    }

    /**
     * 특정 멤버십 번호로 멤버십 정보를 조회합니다. (선택 사항, Checkout 페이지에서 사용 가능)
     * @param no 멤버십 고유 번호
     * @return MembershipDTO
     */
    public MembershipDTO getMembershipByNo(int no) {
        Membership membership = membershipRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException("Membership not found with No: " + no));
        return modelMapper.map(membership, MembershipDTO.class);
    }
}
