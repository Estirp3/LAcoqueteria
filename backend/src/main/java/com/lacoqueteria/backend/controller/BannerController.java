package com.lacoqueteria.backend.controller;

import com.lacoqueteria.backend.model.Banner;
import com.lacoqueteria.backend.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    @Autowired
    private BannerRepository bannerRepository;

    @GetMapping
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    @PostMapping
    public Banner createBanner(@RequestBody Banner banner) {
        return bannerRepository.save(banner);
    }

    @PutMapping("/{id}")
    public Banner updateBanner(@PathVariable Long id, @RequestBody Banner bannerDetails) {
        Banner banner = bannerRepository.findById(id).orElseThrow();
        banner.setTitle(bannerDetails.getTitle());
        banner.setSubtitle(bannerDetails.getSubtitle());
        banner.setImage(bannerDetails.getImage());
        banner.setLink(bannerDetails.getLink());
        banner.setButtonText(bannerDetails.getButtonText());
        return bannerRepository.save(banner);
    }

    @DeleteMapping("/{id}")
    public void deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
    }
}
