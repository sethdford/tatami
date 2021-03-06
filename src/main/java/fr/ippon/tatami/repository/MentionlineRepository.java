package fr.ippon.tatami.repository;

import java.util.List;

/**
 * The Mentionline Repository.
 *
 * @author Julien Dubois
 */
public interface MentionlineRepository {

    /**
     * Add a status to the Mention line.
     */
    void addStatusToMentionline(String mentionedLogin, String statusId);

    /**
     * The mention line : the mentions for a given user.
     * - The name is the statusId of the statuses
     * - Value is always null
     */
    List<String> getMentionline(String login, int size, String since_id, String max_id);
}
