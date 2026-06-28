# Requisitos nomeados C++: SequenceContainer

Um **SequenceContainer** é um [Container](<#/doc/named_req/Container>) que armazena objetos do mesmo tipo em um arranjo linear.

### Requisitos

Dados os seguintes tipos e valores:

Tipo | Definição
---|---
`C` | uma classe de container de sequência
`T` | o tipo de elemento de `C`
`A` | o tipo de alocador de `C`:
  * `C::allocator_type` se existir,
  * caso contrário [std::allocator](<#/doc/memory/allocator>)&lt;T&gt;
`R` (desde C++23) | um tipo que modela [`_container-compatible-range_`](<#/doc/ranges/to>) ﻿`<T>`
---|---
`Args` (desde C++11) | um pacote de parâmetros de template
`Iter` | `C::iterator`
`Ref` | `C::reference`
`CRef` | `C::const_reference`
Valor | Definição
v | um valor do tipo `C`
cv | um valor do tipo const C
i, j | [LegacyInputIterators](<#/doc/named_req/InputIterator>) tal que `[`i`, `j`)` é um [range válido](<#/doc/iterator>) e que os iteradores se referem a elementos implicitamente conversíveis para `C::value_type`
rg (desde C++23) | um valor do tipo `R`
il (desde C++11) | um valor do tipo [std::initializer_list](<#/doc/utility/initializer_list>)<C::value_type>
n | um valor do tipo `C::size_type`
p | um [const iterator](<#/doc/iterator>) válido em v
q | um const iterator [válido e desreferenciável](<#/doc/iterator>) em v
q1, q2 | const iterators em v tal que `[`q1`, `q2`)` é um range válido
t | um valor (até C++11) um [lvalue](<#/doc/language/value_category>) ou rvalue const (desde C++11) do tipo `C::value_type`
rv (desde C++11) | um rvalue não-const do tipo `C::value_type`
args (desde C++11) | um pacote de parâmetros de função com o padrão `Arg&&`

`C` satisfaz os requisitos de SequenceContainer se todas as seguintes condições forem satisfeitas:

  * `C` satisfaz os requisitos de [Container](<#/doc/named_req/Container>).
  * As seguintes declarações e expressões são bem-formadas e possuem a semântica especificada:

Operações básicas
(requerido para todos os containers de sequência na [standard library](<#/doc/named_req/SequenceContainer>) exceto [std::array](<#/doc/container/array>)(desde C++11))
---
```cpp
Declaração | Semântica1
C c(n, t); | Efeito | Constrói o container de sequência contendo n cópias de t.
Pré-condição | | `T` é CopyInsertable em `C`.  // (desde C++11)
Pós-condição | std::distance(c.begin(), c.end()) é n.
C c(i, j); | Efeito | Constrói o container de sequência igual, elemento por elemento, ao range `[`i`, `j`)`.
```
  * Cada iterador no range `[`i`, `j`)` é desreferenciado exatamente uma vez.
Pré-condição | | `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *i. | (desde C++11)
Pós-condição | [std::distance](<#/doc/iterator/distance>)(c.begin(), c.end()) é [std::distance](<#/doc/iterator/distance>)(i, j).
Expressão | Tipo | Semântica
C([std::from_range](<#/doc/ranges/from_range>), rg)
(desde C++23) | `C` | Efeito | Constrói o container de sequência igual, elemento por elemento, ao range rg.
  * Cada iterador no range rg é desreferenciado exatamente uma vez.
Pré-condição | `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg).
---|---
Pós-condição | [std::distance](<#/doc/iterator/distance>)(begin(), end()) é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg).
C(il)
(desde C++11) | `C` | Equivalente a C(il.begin(), il.end()).
v = il
(desde C++11) | `C&` | Efeito | Atribui o range representado por il em v.[2](<#/doc/named_req/SequenceContainer>)
---|---
Valor de retorno | *this
Pré-condição | `T` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `C` e [CopyAssignable](<#/doc/named_req/CopyAssignable>).
Pós-condição | Elementos existentes de v são destruídos ou atribuídos.
v.emplace(p, args)
(desde C++11) | `Iter` | Efeito | Insere um objeto do tipo `T`, construído com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... antes de p.
---|---|---|---
Valor de retorno | Um iterador que aponta para o novo elemento construído a partir de args em v.
Pré-condição | `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de args.
v.insert(p, t) | `Iter` | Efeito | Insere uma cópia de t antes de p.
Valor de retorno | Um iterador que aponta para a cópia de t inserida em v.
Pré-condição | | `T` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `C`. | (desde C++11)
v.insert(p, rv)
(desde C++11) | `Iter` | Efeito | Insere uma cópia de rv antes de p, possivelmente usando move semantics.
---|---|---|---
Valor de retorno | Um iterador que aponta para a cópia de rv inserida em v.
Pré-condição | `T` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `C`.
v.insert(p, n, t) | `Iter` | Efeito | Insere n cópias de t antes de p.
Valor de retorno | Um iterador que aponta para a cópia do primeiro elemento inserido em v, ou p se n for ​0​.
Pré-condição | | `T` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `C` e [CopyAssignable](<#/doc/named_req/CopyAssignable>). | (desde C++11)
v.insert(p, i, j) | `Iter` | Efeito | Insere cópias de elementos em `[`i`, `j`)` antes de p.
  * Cada iterador no range `[`i`, `j`)` é desreferenciado exatamente uma vez.
Valor de retorno | Um iterador que aponta para a cópia do primeiro elemento inserido em v, ou p se i == j for verdadeiro.
Pré-condição
  * `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *i.
| (desde C++11)
  * i e j não estão em v.
v.insert_range(p, rg)
(desde C++23) | `Iter` | Efeito | Insere cópias de elementos em rg antes de p.
  * Cada iterador no range rg é desreferenciado exatamente uma vez.
Valor de retorno | Um iterador que aponta para a cópia do primeiro elemento inserido em v, ou p se rg estiver vazio.
---|---
Pré-condição |
  * `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg).
  * rg e v não se sobrepõem.
v.insert(p, il)
(desde C++11) | `Iter` | Equivalente a v.insert(p, il.begin(), il.end()). v.erase(q) | `Iter` | Efeito | Apaga o elemento apontado por q.
---|---|---|---
Valor de retorno | Um iterador que aponta para o elemento imediatamente seguinte a q antes do elemento ser apagado, ou v.end() se tal elemento não existir.
v.erase(q1, q2) | `Iter` | Efeito | Apaga elementos em `[`q1`, `q2`)`.
Valor de retorno | Um iterador que aponta para o elemento apontado por q2 antes de quaisquer elementos serem apagados, ou v.end() se tal elemento não existir.
v.clear() | void | Efeito | Destrói todos os elementos em v.
  * Invalida todas as referências, ponteiros e iteradores que se referem aos elementos de v e pode invalidar o iterador past-the-end.
Pós-condição | v.empty() é verdadeiro.
---|---
Complexidade | Linear.
v.assign(i, j) | void | Efeito | Substitui elementos em v por uma cópia de `[`i`, `j`)`.
  * Invalida todas as referências, ponteiros e iteradores que se referem aos elementos de v.
  * Cada iterador em `[`i`, `j`)` é desreferenciado exatamente uma vez.
Pré-condição
  * `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *i.
  * `T` é atribuível a partir de *i.
| (desde C++11)
  * i e j não estão em v.
v.assign_range(rg)
(desde C++23) | void | Efeito | Substitui elementos em v por uma cópia de cada elemento em rg.
  * Se [std::assignable_from](<#/doc/concepts/assignable_from>)
` `<T&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;> não for modelado, o programa é malformado.
  * Invalida todas as referências, ponteiros e iteradores que se referem aos elementos de v.
  * Cada iterador no range rg é desreferenciado exatamente uma vez.
Pré-condição |
  * `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg).
  * rg e v não se sobrepõem.
```cpp
v.assign(il)
(desde C++11) | void | Equivalente a v.assign(il.begin(), il.end()).
v.assign(n, t) | void | Efeito | Substitui elementos em v por n cópias de t.
Pré-condição | | `T` é CopyInsertable em `C` e CopyAssignable.  // (desde C++11)
Operações extras3
(requerido apenas para containers de sequência especificados, omitindo `std::`)
Expressão | Tipo | Semântica
v.front() | `Ref` | Containers | `basic_string, array, vector, inplace_vector, deque, list, forward_list`
Valor de retorno | *v.begin()
cv.front() | `CRef` | Containers | `basic_string, array, vector, inplace_vector, deque, list, forward_list`
Valor de retorno | *cv.begin()
v.back() | `Ref` | Containers | `basic_string, array, vector, inplace_vector, deque, list`
Equivalente a auto tmp = v.end(); \--tmp; return *tmp;4.
cv.back() | `CRef` | Containers | `basic_string, array, vector, inplace_vector, deque, list`
Equivalente a auto tmp = cv.end(); \--tmp; return *tmp;5.
v.emplace_front(args)
(desde C++11) | void | Containers | `deque, list, forward_list`
Efeito | Adiciona um objeto do tipo `T` construído com std::forward<Args>(args)... no início.
Valor de retorno | v.front()
Pré-condição | `T` é EmplaceConstructible em `C` a partir de args.
v.emplace_back(args)
(desde C++11) | void | Containers | `vector, inplace_vector, deque, list`
Efeito | Adiciona um objeto do tipo `T` construído com std::forward<Args>(args)... no final.
Valor de retorno | v.back()
Pré-condição | `T` é EmplaceConstructible em `C` a partir de args.
v.push_front(t) | void | Containers | `deque, list, forward_list`
Efeito | Adiciona uma cópia de t no início.
Pré-condição | | `T` é CopyInsertable em `C`.  // (desde C++11)
v.push_front(rv)
(desde C++11) | void | Containers | `deque, list, forward_list`
Efeito | Adiciona uma cópia de rv no início, possivelmente usando move semantics.
Pré-condição | `T` é MoveInsertable em `C`.
v.prepend_range(rg)
(desde C++23) | void | Containers | `deque, list, forward_list`
Efeito | Insere6 cópias de elementos em rg antes de v.begin().
```
  * Cada iterador no range rg é desreferenciado exatamente uma vez.
Pré-condição | `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg).
---|---
v.push_back(t) | void | Containers | `[basic_string](<#/doc/string/basic_string>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>), [list](<#/doc/container/list>)`
Efeito | Adiciona uma cópia de t no final.
Pré-condição | | `T` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `C`. | (desde C++11)
v.push_back(rv)
(desde C++11) | void | Containers | `[basic_string](<#/doc/string/basic_string>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>), [list](<#/doc/container/list>)`
---|---
Efeito | Adiciona uma cópia de rv no final, possivelmente usando move semantics.
Pré-condição | `T` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `C`.
v.append_range(rg)
(desde C++23) | void | Containers | `[vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>), [list](<#/doc/container/list>)`
Efeito | Insere[6](<#/doc/named_req/SequenceContainer>) cópias de elementos em rg antes de v.end().
  * Cada iterador no range rg é desreferenciado exatamente uma vez.
Pré-condição | `T` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `C` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg).
---|---
v.pop_front() | void | Containers | `[deque](<#/doc/container/deque>), [list](<#/doc/container/list>), [forward_list](<#/doc/container/forward_list>)`
Efeito | Destrói o primeiro elemento.
Pré-condição | a.empty() é falso.
v.pop_back() | void | Containers | `[basic_string](<#/doc/string/basic_string>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>), [list](<#/doc/container/list>)`
Efeito | Destrói o último elemento.
Pré-condição | a.empty() é falso.
v[n] | `Ref` | Containers | `[basic_string](<#/doc/string/basic_string>), [array](<#/doc/container/array>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>)`
Equivalente a return *(v.begin() + n);.
cv[n] | `CRef` | Containers | `[basic_string](<#/doc/string/basic_string>), [array](<#/doc/container/array>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>)`
Equivalente a return *(cv.begin() + n);.
v.at(n) | `Ref` | Containers | `[basic_string](<#/doc/string/basic_string>), [array](<#/doc/container/array>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>)`
---|---
Valor de retorno | *(v.begin() + n)
Exceções | Lança [std::out_of_range](<#/doc/error/out_of_range>) se n >= v.size() for verdadeiro.
cv.at(n) | `CRef` | Containers | `[basic_string](<#/doc/string/basic_string>), [array](<#/doc/container/array>), [vector](<#/doc/container/vector>), [inplace_vector](<#/doc/container/inplace_vector>), [deque](<#/doc/container/deque>)`
Valor de retorno | *(cv.begin() + n)
Exceções | Lança [std::out_of_range](<#/doc/error/out_of_range>) se n >= cv.size() for verdadeiro.

Notas

  1. [↑](<#/doc/named_req/SequenceContainer>) Para uma expressão cujo efeito é equivalente a outras operações, as condições das expressões dentro dessas operações são herdadas além das condições listadas na tabela.
  2. [↑](<#/doc/named_req/SequenceContainer>) [std::array](<#/doc/container/array>) suporta atribuição a partir de uma [lista de inicializadores entre chaves](<#/doc/language/initialization>), mas não de um [std::initializer_list](<#/doc/utility/initializer_list>).
  3. [↑](<#/doc/named_req/SequenceContainer>) Todas as operações abaixo, exceto `prepend_range` e `append_range` (desde C++23), levam tempo constante amortizado.
  4. [↑](<#/doc/named_req/SequenceContainer>) Em C++98, tmp foi declarado com o tipo `C::iterator`.
  5. [↑](<#/doc/named_req/SequenceContainer>) Em C++98, tmp foi declarado com o tipo `C::const_iterator`.
  6. ↑ [6.0](<#/doc/named_req/SequenceContainer>) [6.1](<#/doc/named_req/SequenceContainer>) A ordem de inserção, relativa à ordem dos elementos em rg, não é reversível.

Adicionalmente, para cada container de sequência:

  * Um template de construtor que recebe dois input iterators e as sobrecargas de template de função membro de `insert`, `append`, `assign`, `replace` que recebem dois input iterators não participam da resolução de sobrecarga se o argumento de template correspondente não satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>).
  * Um guia de dedução que possui um parâmetro de template [LegacyInputIterator](<#/doc/named_req/InputIterator>) ou `Allocator` não participa da resolução de sobrecarga se o tipo que não se qualifica como um input iterator ou um alocador, respectivamente, for deduzido para esse parâmetro.
| (desde C++17)

### Biblioteca padrão

Os seguintes tipos de string e containers da biblioteca padrão satisfazem os requisitos de SequenceContainer:

[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(template de classe)
[ array](<#/doc/container/array>)(C++11) | array contíguo em-local de tamanho fixo
(template de classe)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(template de classe)
[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo em-local, de capacidade fixa e redimensionável dinamicamente
(template de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(template de classe)
[ forward_list](<#/doc/container/forward_list>)(C++11) | lista simplesmente encadeada
(template de classe)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(template de classe)

#### Notas de uso

Container | Prós | Contras
---|---|---
[std::vector](<#/doc/container/vector>) | Acesso rápido, armazenamento contíguo | Inserções/exclusões geralmente ineficientes
[std::inplace_vector](<#/doc/container/inplace_vector>) | Acesso rápido, armazenamento contíguo em-local | Capacidade fixa e inserções/exclusões geralmente ineficientes
[std::array](<#/doc/container/array>) | Acesso rápido, armazenamento contíguo em-local | Número fixo de elementos e sem inserção/exclusão
[std::deque](<#/doc/container/deque>) | Acesso rápido, inserção/exclusão eficiente no início/fim | Inserção/exclusão ineficiente no meio da sequência
[std::list](<#/doc/container/list>)
[std::forward_list](<#/doc/container/forward_list>) | Inserção/exclusão eficiente no meio da sequência | O acesso é geralmente de tempo linear

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 139](<https://cplusplus.github.io/LWG/issue139>) | C++98 | as operações opcionais não eram exigidas para
serem implementadas para os containers designados | exigido com tempo amortizado
[LWG 149](<https://cplusplus.github.io/LWG/issue149>) | C++98 | v.insert(p, t) retornava `Iter` enquanto
v.insert(p, n, t) e v.insert(p, n, t) retornavam void | todos retornam `Iter`
[LWG 151](<https://cplusplus.github.io/LWG/issue151>) | C++98 | q1 era exigido ser desreferenciável[1](<#/doc/named_req/SequenceContainer>) | pode ser não-desreferenciável
[LWG 355](<https://cplusplus.github.io/LWG/issue355>) | C++98 | chamar v.back() ou v.pop_back() executaria
\--v.end(), o que é perigoso[2](<#/doc/named_req/SequenceContainer>) | decrementa uma cópia
de v.end() em vez disso
[LWG 589](<https://cplusplus.github.io/LWG/issue589>) | C++98 | os elementos aos quais i e j se referem
podem não ser conversíveis para `C::value_type` | eles são implicitamente
conversíveis para `C::value_type`
[LWG 2194](<https://cplusplus.github.io/LWG/issue2194>) | C++11 | [std::queue](<#/doc/container/queue>), [std::priority_queue](<#/doc/container/priority_queue>) e
[std::stack](<#/doc/container/stack>) também eram SequenceContainers[3](<#/doc/named_req/SequenceContainer>) | eles não são SequenceContainers
[LWG 2231](<https://cplusplus.github.io/LWG/issue2231>) | C++11 | o requisito de complexidade de v.clear()
foi omitido por engano em C++11 | complexidade reafirmada como linear
[LWG 3927](<https://cplusplus.github.io/LWG/issue3927>) | C++98 | operator[] não tinha requisito implícito | adicionado o requisito implícito

  1. [↑](<#/doc/named_req/SequenceContainer>) É um defeito porque torna o comportamento de v.erase(v.begin(), v.end()) indefinido se v for um container vazio.
  2. [↑](<#/doc/named_req/SequenceContainer>) Se o tipo de v.end() for um tipo fundamental, \--v.end() é malformado. É perigoso quando o tipo de v é um template, neste caso este bug pode ser difícil de ser encontrado.
  3. [↑](<#/doc/named_req/SequenceContainer>) Eles não foram documentados como SequenceContainers em C++98.

  *[_(as is)_]: A::pointer