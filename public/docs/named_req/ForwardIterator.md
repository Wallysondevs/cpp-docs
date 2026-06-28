# Requisitos nomeados C++: LegacyForwardIterator

Um **LegacyForwardIterator** é um [LegacyIterator](<#/doc/named_req/Iterator>) que pode ler dados do elemento apontado.

Ao contrário de [LegacyInputIterator](<#/doc/named_req/InputIterator>) e [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), ele pode ser usado em algoritmos multipass.

Se um **LegacyForwardIterator** se origina de um [Container](<#/doc/named_req/Container>), então seu tipo de valor é o mesmo do container, de modo que a desreferenciação (*it) obtém o tipo de valor do container.

### Requisitos

Tipo | Definição
---|---
`X` | Um tipo de forward iterator
`T` | O [tipo de valor](<#/doc/iterator>) de `X` (i.e. [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::value_type)
`Ref` | [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;X&gt;::reference
Valor | Definição
i, j | Valores do tipo `X` ou const X
r | Um valor do tipo `X&`

`X` satisfaz LegacyForwardIterator se todas as seguintes condições forem satisfeitas:

  * `X` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>).
  * `X` satisfaz [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).
  * Se `X` é um [mutable iterator](<#/doc/iterator>), `Ref` é uma referência para `T`.
  * Se `X` é um constant iterator, `Ref` é uma referência para const T.
  * Objetos do tipo `X` fornecem [garantia multi-pass](<#/doc/named_req/ForwardIterator>).
  * Se i e j são iguais, então ou i e j são ambos [desreferenciáveis](<#/doc/iterator>) ou nenhum é desreferenciável.
  * Se i e j são ambos desreferenciáveis, então i == j se e somente se *i e *j estão ligados ao mesmo objeto.
  * As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Tipo | Efeitos
---|---|---
r++ | conversível para const X& | Equivalente a X x = r;
++r;
return x;.
*i++ | `Ref` |

### Domínio de igualdade

O [domínio](<#/doc/named_req/InputIterator>) de == para forward iterators é o de iterators sobre a mesma [sequência subjacente](<#/doc/iterator>).

No entanto, forward iterators [inicializados por valor](<#/doc/language/value_initialization>) podem ser comparados e devem ser iguais a outros iterators inicializados por valor do mesmo tipo. Em outras palavras, forward iterators inicializados por valor se comportam como se referissem ao final da mesma sequência vazia. | (desde C++14)

### Garantia multi-pass

Dois iterators desreferenciáveis a e b do tipo `X` oferecem a _garantia multi-pass_ se todas as seguintes condições forem satisfeitas:

  * a == b implica ++a == ++b.
  * Qualquer uma das seguintes condições é satisfeita:

    

  * `X` é um tipo ponteiro.
  * A expressão (void)++X(a), *a é equivalente à expressão *a.

### Conceito

Para a definição de [std::iterator_traits](<#/doc/iterator/iterator_traits>), o seguinte conceito apenas para exposição é definido. | template&lt;class It&gt;
concept __LegacyForwardIterator =
__LegacyInputIterator&lt;It&gt; && [std::constructible_from](<#/doc/concepts/constructible_from>)&lt;It&gt; &&
[std::is_reference_v](<#/doc/types/is_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt;> &&
[std::same_as](<#/doc/concepts/same_as>)<
[std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt;>,
typename [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)&lt;It&gt;::value_type> &&
requires(It it) {
{ it++ } -> [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const It&&gt;;
{ *it++ } -> [std::same_as](<#/doc/concepts/same_as>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt;>;
};

onde o conceito apenas para exposição `__LegacyInputIterator<T>` é descrito em [LegacyInputIterator](<#/doc/named_req/InputIterator>).

(desde C++20)

### Notas

Ao contrário do conceito [std::forward_iterator](<#/doc/iterator/forward_iterator>), os requisitos de LegacyForwardIterator exigem que a desreferenciação retorne uma referência.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 1212](<https://cplusplus.github.io/LWG/issue1212>)
([N3066](<https://wg21.link/N3066>)) | C++98 | o tipo de *i++ não correspondia ao tipo de
*i-- exigido por [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) | alterou o
tipo para `Ref`
[LWG 1311](<https://cplusplus.github.io/LWG/issue1311>)
([N3066](<https://wg21.link/N3066>)) | C++98 | "a == b implica ++a == ++b" sozinho
não oferecia garantia multipass[1](<#/doc/named_req/ForwardIterator>) | também exige "a == b
implica ++a != b"[2](<#/doc/named_req/ForwardIterator>)
[LWG 3798](<https://cplusplus.github.io/LWG/issue3798>) | C++20 | `__LegacyForwardIterator` exigia
[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;It&gt; ser um tipo de referência lvalue | também permite tipos de referência rvalue

  1. [↑](<#/doc/named_req/ForwardIterator>) No cenário onde a e b usam o mesmo iterator subjacente, avaliar a expressão ++a == ++b na verdade incrementa o container subjacente duas vezes, mas o resultado ainda é verdadeiro.
  2. [↑](<#/doc/named_req/ForwardIterator>) Formalmente também exige implicar ++b != a.

### Veja também

[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um [`input_iterator`](<#/doc/iterator/input_iterator>) é um forward iterator, suportando comparação de igualdade e multi-pass
(concept)
[**Biblioteca de iterators**](<#/doc/iterator>) | fornece definições para iterators, iterator traits, adaptadores e funções de utilidade
*[_(as is)_]: A::pointer