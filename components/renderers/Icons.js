import Image from 'next/image';

import AccountBalance from '@/assets/svg/account_balance.svg';
import AccountCircleBlock from '@/assets/svg/account_circle_block.svg';
import AddReaction from '@/assets/svg/add_reaction.svg';
import AI from '@/assets/svg/ai.svg';
import AnimatedImagesBlock from '@/assets/svg/animated_images_block.svg';
import Cardiology from '@/assets/svg/cardiology.svg';
import Diversity from '@/assets/svg/diversity_4.svg';
import Document from '@/assets/svg/document.svg';
import Factory from '@/assets/svg/factory.svg';
import Finance from '@/assets/svg/finance_svg.svg';
import Fingerprint from '@/assets/svg/fingerprint.svg';
import Groups from '@/assets/svg/groups.svg';
import Handshake from '@/assets/svg/handshake.svg';
import HomeHealth from '@/assets/svg/home_health.svg';
import IdBadge from '@/assets/svg/id_badge_svg.svg';
import ManageAccounts from '@/assets/svg/manage_accounts.svg';
import NestLeaf from '@/assets/svg/nest_eco_leaf.svg';
import Newspaper from '@/assets/svg/newspaper.svg';
import PeopleSupport from '@/assets/svg/people_support_svg.svg';
import PlainStar from '@/assets/svg/plain_star.svg';
import Print from '@/assets/svg/print.svg';
import PrintConnect from '@/assets/svg/print_connect_svg.svg';
import ProductExtension from '@/assets/svg/product_extension.svg';
import Workflow from '@/assets/svg/product_workflow.svg';
import FilmBlock from '@/assets/svg/purple-film-block.svg';
import Retail from '@/assets/svg/retail.svg';
import Rocket from '@/assets/svg/rocket_launch.svg';
import School from '@/assets/svg/school.svg';
import Security from '@/assets/svg/security.svg';
import ShieldLock from '@/assets/svg/shield_lock.svg';
import Storefront from '@/assets/svg/storefront.svg';
import Storytellers from '@/assets/svg/storytellers_svg.svg';
import SupportAgent from '@/assets/svg/support_agent_svg.svg';
import Tune from '@/assets/svg/tune.svg';
import TuneBlock from '@/assets/svg/tune_block.svg';
import TwoPaperBlock from '@/assets/svg/two_paper_block.svg';
import VasionStar from '@/assets/svg/vasion-star-block.svg';
import Volunteer from '@/assets/svg/volunteer_activism.svg';
import WorkflowBlock from '@/assets/svg/workflow_block.svg';
import ZeroTrust from '@/assets/svg/zero-trust.svg';

const imageIcons = {
  aws_s3: '/images/nav-webp/amazon-s3.webp',
  aws_textract: '/images/nav-webp/aws_textract.webp',
};

const svgIcons = {
  account_balance: AccountBalance,
  account_circle_block: AccountCircleBlock,
  add_reaction: AddReaction,
  ai: AI,
  animated_images_block: AnimatedImagesBlock,
  cardiology: Cardiology,
  diversity: Diversity,
  document: Document,
  factory: Factory,
  film_block: FilmBlock,
  finance: Finance,
  fingerprint: Fingerprint,
  groups: Groups,
  handshake: Handshake,
  home_health: HomeHealth,
  id_badge: IdBadge,
  manage_accounts: ManageAccounts,
  nest_eco_leaf: NestLeaf,
  newspaper: Newspaper,
  people_support: PeopleSupport,
  plain_star: PlainStar,
  print: Print,
  print_connect: PrintConnect,
  product_extension: ProductExtension,
  retail: Retail,
  rocket_launch: Rocket,
  school: School,
  security: Security,
  shield_lock: ShieldLock,
  storefront: Storefront,
  storytellers: Storytellers,
  support_agent: SupportAgent,
  tune: Tune,
  tune_block: TuneBlock,
  two_paper_block: TwoPaperBlock,
  vasion_star: VasionStar,
  volunteer_activism: Volunteer,
  workflow: Workflow,
  workflow_block: WorkflowBlock,
  zero_trust: ZeroTrust,
};

const IconRenderer = ({ iconName, ...props }) => {
  if (imageIcons[iconName]) {
    return <Image alt={iconName} height={20} src={imageIcons[iconName]} width={20} {...props} />;
  }

  const SvgIcon = svgIcons[iconName];
  return SvgIcon ? <SvgIcon {...props} /> : null;
};

export default IconRenderer;
