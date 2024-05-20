package com.nationalParkApp.demo.Repository;

import com.nationalParkApp.demo.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    public List<ReviewEntity> findByParkCode(String parkCode);

    public List<ReviewEntity> findByUserId(Long id);
}
