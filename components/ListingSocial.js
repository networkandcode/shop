import { CardContent, Typography } from '@material-ui/core';
import { ContactPhone, Email, Facebook, Instagram, Language, LinkedIn, LocationOn, Twitter, WhatsApp, YouTube } from '@material-ui/icons';

const ListingSocial = ({ listing }) => {
  return (
    <Typography variant="body2">

      { listing.telePhone && (
        <>
          <a href={`tel: ${listing.telePhone}`}>
            <ContactPhone style={{ verticalAlign: `middle` }}/> { listing.telePhone }
          </a>
          <br/>
        </>
      )}

      { listing.emailAddress && (
          <>
            <a href={`mailto:${listing.emailAddress}`} >
              <Email style={{ verticalAlign: `middle` }}/> { listing.emailAddress }
            </a>
            <br/>
          </>
      )}

      { listing.facebookUrl && (
          <>
            <a href={listing.facebookUrl}>
              <Facebook style={{ verticalAlign: `middle` }}/> { listing.facebookUrl }
            </a>
            <br/>
          </>
      )}

      { listing.instagramUrl && (
        <>
          <a href={listing.instagramUrl}>
            <Instagram style={{ verticalAlign: `middle` }}/> { listing.instagramUrl }
          </a>
          <br/>
        </>
      )}

      { listing.linkedInUrl && (
        <>
          <a href={listing.linkedInUrl}>
            <LinkedIn style={{ verticalAlign: `middle` }}/> { listing.linkedInUrl }
          </a>
          <br/>
        </>
      )}

      { listing.plusCode && (
        <>
          <a href={`https://plus.codes/${location.plusCode}`}>
            <LocationOn style={{ verticalAlign: `middle` }}/> { listing.plusCode }
          </a>
          <br/>
        </>
      )}

      { listing.twitterUrl && (
        <>
          <a href={listing.twitterUrl}>
            <Twitter style={{ verticalAlign: `middle` }}/> { listing.twitterUrl }
          </a>
          <br/>
        </>
      )}

      { listing.website && (
        <>
          <a href={listing.website}>
            <Language style={{ verticalAlign: `middle` }}/> { listing.website }
          </a>
          <br/>
        </>
      )}

      { listing.whatsAppUrl && (
        <>
          <a href={`https://api.whatsapp.com/send?phone=${listing.whatsApp}`} target="_blank">
            <WhatsApp style={{ verticalAlign: `middle` }}/> { listing.whatsAppUrl }
          </a>
          <br/>
        </>
      )}

      { listing.youTubeUrl && (
        <>
          <a href={listing.youTubeUrl} target="_blank">
            <YouTube style={{ verticalAlign: `middle` }}/> { listing.youTubeUrl }
          </a>
          <br/>
        </>
      )}

    </Typography>
  )
}

export default ListingSocial;
