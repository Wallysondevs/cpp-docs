# Requisitos nomeados C++: Container

Um Container é um objeto usado para armazenar outros objetos e que cuida do gerenciamento da memória utilizada pelos objetos que ele contém.

### Requisitos

Dados os seguintes tipos e valores:

Tipo | Definição
---|---
`T` | um tipo de objeto
`C` | uma classe container contendo objetos do tipo `T`
Valor | Definição
u, v | valores do tipo `C` ou const C
mv | um valor do tipo `C`
cv | um valor do tipo const C
lhs, rhs | lvalues do tipo `C`
i, j | valores do tipo `C::iterator` ou const C::iterator

`C` satisfaz os requisitos de Container se os seguintes tipos, declarações e expressões forem bem-formados e tiverem a semântica especificada:

#### Tipos

Tipo | Definição | Requisitos
---|---|---
typename C::value_type | `T` | `T` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) (até C++11) [Erasable](<#/doc/named_req/Erasable>) de `C` (desde C++11).
typename C::reference | `T&` | Nenhum requisito explícito
typename C::const_reference | const T&
typename C::iterator | um tipo de iterator |
  * `C::iterator` é um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), e seu [tipo de valor](<#/doc/iterator>) é `T`.
  * `C::iterator` é conversível para `C::const_iterator`.

typename C::const_iterator | um tipo de iterator constante | `C::const_iterator` é um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), e seu [tipo de valor](<#/doc/iterator>) é `T`.
---|---|---
typename C::difference_type | um tipo inteiro com sinal | `C::difference_type` é o mesmo que o [tipo de diferença](<#/doc/iterator>) de `C::iterator` e `C::const_iterator`.
typename C::size_type | um tipo inteiro sem sinal | `C::size_type` é grande o suficiente para representar todos os valores não negativos de `C::difference_type`.

#### Declarações

```text
Declaração | Semântica | Complexidade
C c; C c = C(); | Pós-condição | c.empty() é verdadeiro. | constante
C c(v); C c = C(v); | Pré-condição | | Se v não for um rvalue do tipo `C`, `T` é CopyInsertable em `C`.  // (desde C++11)
linear1
Pós-condição
```
  * Se v for um lvalue, c == v é verdadeiro.
  * Se v for um rvalue, e c e v não se referirem ao mesmo objeto (desde C++11), c é igual ao valor que v tinha antes desta construção.

Notas

  1. [↑](<#/doc/named_req/Container>) Se v for um rvalue do tipo `C`, e `C` não for uma especialização de [std::array](<#/doc/container/array>) ou [`std::inplace_vector`](<#/doc/container/inplace_vector>), a complexidade é constante.

#### Expressões

```text
Expressão | Tipo | Semântica | Complexidade
C() | `C` | Pós-condição | C().empty() é verdadeiro. | constante
C(v) | `C` | Pré-condição | | Se v não for um rvalue do tipo `C`, `T` é CopyInsertable em `C`. | (desde C++11)
constante1
Pós-condição |
```
  * Se v for um lvalue, C(v) == v é verdadeiro.
  * Se v for um rvalue, e C(v) e v não se referirem ao mesmo objeto (desde C++11), C(v) é igual ao valor que v tinha antes desta construção.

lhs = v | `C&` | Pós-condição |
  * Se v for um lvalue, lhs == v é verdadeiro.
  * Se v for um rvalue, e lv e v não se referirem ao mesmo objeto (desde C++11), lhs é igual ao valor que v tinha antes desta atribuição.
```text
| linear
v.~C() | void | Efeito | Destrói todos os elementos de v e desaloca toda a memória obtida. | linear
mv.begin() | `C::iterator` | Efeito | Retorna um iterator apontando para o primeiro elemento de mv. | constante
cv.begin() | `C::const_iterator` | Efeito | Retorna um iterator apontando para o primeiro elemento de cv. | constante
mv.end() | `C::iterator` | Efeito | Retorna o iterator past-the-end de mv. | constante
cv.end() | `C::const_iterator` | Efeito | Retorna o iterator past-the-end de cv. | constante
v.cbegin()
(desde C++11) | `C::const_iterator` | Efeito | Retorna const_cast<const C&>(v).begin(). | constante
v.cend()
(desde C++11) | `C::const_iterator` | Efeito | Retorna const_cast<const C&>(v).end(). | constante
i <=> j
(desde C++20) | `std::strong_ordering` | Restrição | Esta expressão é exigida como bem-formada apenas se `C::iterator` satisfizer os requisitos de iterator de acesso aleatório. | constante
u == v | bool | Efeito | Retorna | u.size() == v.size() &&
std::equal(u.begin(),
u.end(), v.begin())  // (até C++14)
std::equal(u.begin(), u.end(),
v.begin(), v.end())  // (desde C++14)
. linear2
u != v | | Efeito | Equivalente a !(u == v).
lhs.swap(rhs) swap(lhs, rhs) | void | Efeito | Troca o conteúdo de lhs e rhs. | constante3
v.size() | `C::size_type` | Efeito | Retorna o número de elementos4 de v. | constante
v.max_size() | `C::size_type` | Efeito | Retorna o número de elementos do maior container possível do tipo `C`. | constante
v.empty() | bool | Efeito | Retorna v.begin() == v.end(). | constante
Requisitos opcionais de container
(fornecidos apenas para alguns tipos de containers)
u <=> v
(desde C++20) | `_synth-three-way-result_`
` `<C::value_type> | Pré-condição | Ou `T` modela `three_way_comparable`, ou operator< é uma relação de ordenação total definida para valores do tipo `T` e const T. | linear
Efeito | Retorna std::lexicographical_compare_three_way
` `(u.begin(), u.end(),
` `v.begin(), v.end(),
` `` _synth-three-way_` ﻿)5.
Notas
```

  1. [↑](<#/doc/named_req/Container>) Se v for um rvalue do tipo `C`, e `C` for uma especialização de [std::array](<#/doc/container/array>) ou [`std::inplace_vector`](<#/doc/container/inplace_vector>), a complexidade é linear.
  2. [↑](<#/doc/named_req/Container>) Se u.size() != v.size() for verdadeiro, a complexidade é constante.
  3. [↑](<#/doc/named_req/Container>) Se `C` for uma especialização de [std::array](<#/doc/container/array>) ou [`std::inplace_vector`](<#/doc/container/inplace_vector>), a complexidade é linear.
  4. [↑](<#/doc/named_req/Container>) O número de elementos é definido pelas regras de construtores, inserções e remoções. É igual ao valor de [std::distance](<#/doc/iterator/distance>)(v.begin(), v.end()).
  5. [↑](<#/doc/named_req/Container>) Se os iterators passados para [std::lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>) forem [ConstexprIterators](<#/doc/named_req/ConstexprIterator>), a operação é implementada por funções constexpr.

Nas expressões i == j, i != j, i < j, i <= j, i >= j, i > j e i - j, se i e/ou j forem substituídos por iterators do tipo `C::const_iterator` apontando para o mesmo elemento, respectivamente, a semântica permanece a mesma.

### Condições de corrida de dados em containers

Veja [segurança de thread de containers](<#/doc/container>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

```text
DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
LWG 179 | C++98 | tipos `iterator` e `const_iterator` podem ser incomparáveis | exigido que sejam comparáveis
LWG 276 | C++98 | `T` era exigido como CopyAssignable | `T` é exigido como
CopyConstructible
LWG 322 | C++98 | os tipos de valor de `iterator` e `const_iterator` não eram especificados | especificado como `T`
LWG 774 | C++98 | não havia requisito para swap(a, b) | adicionado
LWG 883 | C++98 | a.swap(b) era definido como swap(a, b),
resultando em definição circular | definido como a troca
dos valores de a e b
LWG 1319 | C++98 | `iterator` e `const_iterator`
podem não ter garantia multipass | eles são exigidos para satisfazer
os requisitos de
LegacyForwardIterator
LWG 2114
(P2167R3) | C++98 | tipos de retorno não-bool de algumas funções eram permitidos | não permitidos
LWG 2182 | C++98 | os tipos denotados por `reference` e
`const_reference` eram mal especificados | redação aprimorada
LWG 2257 | C++98 | dois containers exigiam tempo linear para comparar
igualdade mesmo que tivessem tamanhos diferentes | exige apenas tempo
constante neste caso
LWG 2263 | C++11 | a resolução do problema LWG 179 foi acidentalmente removida no C++11 | restaurada
LWG 2839 | C++11 | auto-atribuição por move de containers padrão não era permitida | permitida, mas o
resultado é não especificado
N3346 | C++11 | `C::value_type` era exigido como Destructible | exigido como Erasable de `C`
```

### Veja também

[documentação C++](<#/doc/container>) para a biblioteca de Containers
---
  *[_(como está)_]: A::pointer