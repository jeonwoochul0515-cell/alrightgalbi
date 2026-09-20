import { FieldInput } from "./FieldInput";
import { RecordList } from "./RecordList";
import {
  faqSchema,
  franchiseCostSchema,
  instagramSchema,
  menuCategorySchema,
  menuItemSchema,
  newsSchema,
  processStepSchema,
  settingsFields,
  socialProofSchema,
  storeSchema,
  trustBadgeSchema,
  valuePropSchema,
} from "./fields";
import { setPath } from "./pathUtils";
import type { SectionId, SiteContent } from "../content/types";

type Item = Record<string, unknown>;

export interface SectionEditorProps {
  section: SectionId;
  draft: SiteContent;
  patch: (changes: Partial<SiteContent>) => void;
}

function Group({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h3 className="mb-1 text-sm font-semibold text-zinc-200">{title}</h3>
      {description && <p className="mb-3 text-xs leading-relaxed text-zinc-500">{description}</p>}
      {children}
    </section>
  );
}

export function SectionEditor({ section, draft, patch }: SectionEditorProps) {
  const asItems = (v: unknown): Item[] => (Array.isArray(v) ? (v as Item[]) : []);

  switch (section) {
    case "settings":
      return (
        <Group
          title="사이트 설정"
          description="리뉴얼 모드를 끄면 방문자에게 실제 홈페이지가 공개됩니다."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {settingsFields.map((field) => (
              <FieldInput
                key={field.path}
                field={field}
                record={draft.settings as unknown as Item}
                onChange={(path, value) =>
                  patch({
                    settings: setPath(
                      draft.settings as unknown as Item,
                      path,
                      value
                    ) as unknown as SiteContent["settings"],
                  })
                }
              />
            ))}
          </div>
        </Group>
      );

    case "stores":
      return (
        <Group
          title="매장"
          description="여기서 추가한 매장은 매장 찾기·푸터·지도에 함께 반영됩니다. ID는 매장 상세 페이지 주소가 됩니다."
        >
          <RecordList
            schema={storeSchema}
            items={asItems(draft.stores)}
            onChange={(items) => patch({ stores: items as unknown as SiteContent["stores"] })}
            addLabel="매장 추가"
          />
        </Group>
      );

    case "menu":
      return (
        <>
          <Group title="메뉴" description="가격은 원 단위로 입력합니다.">
            <RecordList
              schema={menuItemSchema}
              items={asItems(draft.menuItems)}
              onChange={(items) =>
                patch({ menuItems: items as unknown as SiteContent["menuItems"] })
              }
              addLabel="메뉴 추가"
            />
          </Group>

          <Group title="메뉴 분류">
            <RecordList
              schema={menuCategorySchema}
              items={asItems(draft.menuCategories)}
              onChange={(items) =>
                patch({ menuCategories: items as unknown as SiteContent["menuCategories"] })
              }
              addLabel="분류 추가"
            />
          </Group>

          <Group title="상차림비">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { path: "label", label: "항목명", type: "text" as const },
                { path: "amount", label: "금액 (원)", type: "number" as const },
                { path: "note", label: "비고", type: "text" as const, wide: true },
              ].map((field) => (
                <FieldInput
                  key={field.path}
                  field={field}
                  record={draft.tableCharge as unknown as Item}
                  onChange={(path, value) =>
                    patch({
                      tableCharge: setPath(
                        draft.tableCharge as unknown as Item,
                        path,
                        value
                      ) as unknown as SiteContent["tableCharge"],
                    })
                  }
                />
              ))}
            </div>
          </Group>
        </>
      );

    case "faq":
      return (
        <Group title="자주 묻는 질문" description="가맹 페이지 하단 FAQ에 이 순서 그대로 나옵니다.">
          <RecordList
            schema={faqSchema}
            items={asItems(draft.faqItems)}
            onChange={(items) => patch({ faqItems: items as unknown as SiteContent["faqItems"] })}
            addLabel="질문 추가"
          />
        </Group>
      );

    case "franchise":
      return (
        <>
          <Group
            title="가맹 비용"
            description="단위가 '천원'이면 5500 = 550만원입니다. 합계는 자동으로 다시 계산됩니다."
          >
            <RecordList
              schema={franchiseCostSchema}
              items={asItems(draft.franchiseCosts)}
              onChange={(items) =>
                patch({ franchiseCosts: items as unknown as SiteContent["franchiseCosts"] })
              }
              addLabel="비용 항목 추가"
            />
          </Group>

          <Group title="핵심 강점" description="가맹 페이지 상단 숫자 카드입니다.">
            <RecordList
              schema={valuePropSchema}
              items={asItems(draft.valueProps)}
              onChange={(items) =>
                patch({ valueProps: items as unknown as SiteContent["valueProps"] })
              }
              addLabel="강점 추가"
            />
          </Group>

          <Group title="창업 절차">
            <RecordList
              schema={processStepSchema}
              items={asItems(draft.processSteps)}
              onChange={(items) =>
                patch({ processSteps: items as unknown as SiteContent["processSteps"] })
              }
              addLabel="단계 추가"
            />
          </Group>
        </>
      );

    case "instagram":
      return (
        <>
          <Group title="해시태그 링크">
            <FieldInput
              field={{
                path: "instagramHashtagUrl",
                label: "해시태그 탐색 URL",
                type: "text",
                wide: true,
              }}
              record={draft as unknown as Item}
              onChange={(_, value) =>
                patch({ instagramHashtagUrl: (value as string) ?? "" })
              }
            />
          </Group>

          <Group
            title="인스타그램 게시물"
            description="썸네일은 web/public/instagram 폴더에 올린 파일 경로를 적습니다."
          >
            <RecordList
              schema={instagramSchema}
              items={asItems(draft.instagramPosts)}
              onChange={(items) =>
                patch({ instagramPosts: items as unknown as SiteContent["instagramPosts"] })
              }
              addLabel="게시물 추가"
            />
          </Group>
        </>
      );

    case "news":
      return (
        <Group title="소식" description="비워두면 소식 영역이 노출되지 않습니다.">
          <RecordList
            schema={newsSchema}
            items={asItems(draft.newsItems)}
            onChange={(items) => patch({ newsItems: items as unknown as SiteContent["newsItems"] })}
            addLabel="소식 추가"
          />
        </Group>
      );

    case "trust":
      return (
        <>
          <Group title="권위 배지" description="페이지 상단에 노출됩니다.">
            <RecordList
              schema={trustBadgeSchema}
              items={asItems(draft.authorityBadges)}
              onChange={(items) =>
                patch({ authorityBadges: items as unknown as SiteContent["authorityBadges"] })
              }
              addLabel="배지 추가"
            />
          </Group>

          <Group title="안전 배지" description="문의 폼 바로 앞에 노출됩니다.">
            <RecordList
              schema={trustBadgeSchema}
              items={asItems(draft.safetyBadges)}
              onChange={(items) =>
                patch({ safetyBadges: items as unknown as SiteContent["safetyBadges"] })
              }
              addLabel="배지 추가"
            />
          </Group>

          <Group title="후기·소셜 지표">
            <RecordList
              schema={socialProofSchema}
              items={asItems(draft.socialProofItems)}
              onChange={(items) =>
                patch({ socialProofItems: items as unknown as SiteContent["socialProofItems"] })
              }
              addLabel="항목 추가"
            />
          </Group>
        </>
      );
  }
}
