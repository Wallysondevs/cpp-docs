# Requisitos nomeados C++: AssociativeContainer

Um **AssociativeContainer** é um [Container](<#/doc/named_req/Container>) ordenado que fornece busca rápida de objetos baseada em chaves.

Um container associativo suporta _chaves únicas_ se ele pode conter no máximo um elemento para cada chave. Caso contrário, ele suporta _chaves equivalentes_.

### Requisitos

##### Legenda

---
`X` | Uma classe de container associativo
---|---
`T` | O tipo de elemento de `X`
`A` | O tipo de allocator de `X`: `X::allocator_type` se existir, caso contrário [std::allocator](<#/doc/memory/allocator>)<X::value_type>
a | Um valor do tipo `X`
a2 | Um valor de um tipo `Y` cujos [node handles](<#/doc/container/node_handle>) são compatíveis com `X`
b | Um valor do tipo `X` ou const X
u | Um nome de uma variável sendo declarada
a_uniq | Um valor do tipo `X` quando `X` suporta chaves únicas
a_eq | Um valor do tipo `X` quando `X` suporta chaves equivalentes
a_tran | Um valor do tipo `X` ou const X quando o tipo `X::key_compare::is_transparent` existe
i, j | Os [LegacyInputIterators](<#/doc/named_req/InputIterator>) referindo-se a elementos implicitamente conversíveis para `X::value_type`
`[`i`, `j`)` | Um range válido
rg
(desde C++23) | Um valor de um tipo `R` que modela [`_container-compatible-range_`](<#/doc/ranges/to>)`<value_type>`
---|---
p | Um iterator constante válido para a
q | Um iterator constante válido desreferenciável para a
r | Um iterator válido desreferenciável para a
q1, q2 | Um range válido de iterators constantes em a
il | Um objeto do tipo [std::initializer_list](<#/doc/utility/initializer_list>)<X::value_type>
t | Um valor do tipo `X::value_type`
k | Um valor do tipo `X::key_type`
c | Um valor do tipo `X::key_compare` ou const X::key_compare
kl | Um valor tal que a é particionado em relação a c(x, kl), com x o valor da chave de e e e em a
ku | Um valor tal que a é particionado em relação a !c(ku, x), com x o valor da chave de e e e em a
ke | Um valor tal que a é particionado em relação a c(x, ke) e !c(ke, x), com c(x, ke) implicando !c(ke, x) e com x o valor da chave de e e e em a
kx
(desde C++23) | Um valor tal que:
  * a é particionado em relação a c(x, kx) e !c(kx, x), com c(x, kx) implicando !c(kx, x) e com x o valor da chave de e e e em a, e
  * kx não é conversível para `X::iterator` nem para `X::const_iterator`
m | Um allocator de um tipo conversível para `A`
---|---
nh | Um rvalue não-const do tipo `X::node_type`

O tipo `X` satisfaz AssociativeContainer se
  * O tipo `X` satisfaz [Container](<#/doc/named_req/Container>)(ate C++11)[AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>)(desde C++11),
  * É parametrizado em `Key` e uma relação de ordenação `Compare` que induz uma [ordenação fraca estrita](<#/doc/named_req/Compare>) nos elementos de `Key`, e
    * Além disso, [std::map](<#/doc/container/map>) e [std::multimap](<#/doc/container/multimap>) associam um _tipo mapeado_ `T` arbitrário com a `Key`.
    * O objeto do tipo `Compare` é chamado de _objeto de comparação_ de um container do tipo `X`.
  * As seguintes expressões devem ser válidas e ter seus efeitos especificados para todos os containers associativos:

#### Tipos

Nome | Tipo | Requisitos
---|---|---
`key_type` | `Key` |
`mapped_type` | `T` (apenas para [std::map](<#/doc/container/map>) e [std::multimap](<#/doc/container/multimap>)) |
`value_type` |
  * `Key` (apenas para [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>))
  * [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;(apenas para [std::map](<#/doc/container/map>) e [std::multimap](<#/doc/container/multimap>))
| [Erasable](<#/doc/named_req/Erasable>) de `X`
---|---
`key_compare` | `Compare` | [CopyConstructible](<#/doc/named_req/CopyConstructible>)
`value_compare` |
  * o mesmo que `key_compare` (para [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>))
  * uma relação de ordenação em pares induzida pelo primeiro componente (i.e. `Key`) (para [std::map](<#/doc/container/map>) e [std::multimap](<#/doc/container/multimap>))
| [BinaryPredicate](<#/doc/named_req/BinaryPredicate>)
`node_type` | Uma especialização do [template de classe node-handle](<#/doc/container/node_handle>), tal que os tipos aninhados públicos são os mesmos tipos que os tipos correspondentes em `X`. |

#### Funções membro e operadores

```text
Expressão | Resultado | Pré-condições | Efeitos | Retorna | Complexidade
X(c) | | | Constrói um container vazio. Usa uma cópia de c como objeto de comparação | | Constante
X u = X();
X u; | | `key_compare` atende aos requisitos de DefaultConstructible | Constrói um container vazio. Usa Compare() como objeto de comparação | | Constante
X(i, j, c) | | `value_type` é EmplaceConstructible em `X` a partir de *i | Constrói um container vazio e insere elementos do range ``i`, `j`)` nele; usa c como objeto de comparação | | N·log(N) em geral, onde `N` tem o valor [std::distance(i, j); linear se `[`i`, `j`)` estiver ordenado em relação a value_comp()
X(i, j) | | `key_compare` atende aos requisitos de DefaultConstructible. `value_type` é EmplaceConstructible em `X` a partir de *i | Constrói um container vazio e insere elementos do range `[`i`, `j`)` nele; usa Compare() como objeto de comparação
X(from_range, rg, c)
(desde C++23) | | `value_type` é EmplaceConstructible em `X` a partir de *ranges::begin(rg) | Constrói um container vazio e insere cada elemento de rg nele. Usa c como objeto de comparação | | N·log(N) em geral, onde `N` tem o valor ranges::distance(rg); linear se rg estiver ordenado em relação a value_comp()
X(from_range, rg)
(desde C++23) | | `key_compare` atende aos requisitos de DefaultConstructible. `value_type` é EmplaceConstructible em `X` a partir de *ranges::begin(rg) | Constrói um container vazio e insere cada elemento de rg nele. Usa Compare() como objeto de comparação
X(il, c) | | | X(il.begin(), il.end(), c)
X(il) | | | X(il.begin(), il.end())
a = il | X& | `value_type` é CopyInsertable em `X` e CopyAssignable | Atribui o range `[`il.begin()`, `il.end()`)` a a. Todos os elementos existentes de a são atribuídos ou destruídos | | N·log(N) em geral, onde `N` tem o valor il.size() + a.size(); linear se `[`il.begin()`, `il.end()`)` estiver ordenado em relação a value_comp()
b.key_comp() | `X::key_compare` | | | O objeto de comparação a partir do qual b foi construído | Constante
b.value_comp() | `X::value_compare` | | | Um objeto de `value_compare` construído a partir do objeto de comparação | Constante
a_uniq.emplace(args) | std::pair<
iterator,
bool> | `value_type` é EmplaceConstructible em `X` a partir de args | Insere um objeto `value_type` t construído com std::forward<Args>(args)... se e somente se não houver nenhum elemento no container com chave equivalente à chave de t | O componente bool do par retornado é true se e somente se a inserção ocorrer, e o componente iterator do par aponta para o elemento com chave equivalente à chave de t | Logarítmica
a_eq.emplace(args) | `iterator` | `value_type` é EmplaceConstructible em `X` a partir de args | Insere um objeto `value_type` t construído com std::forward<Args>(args).... Se um range contendo elementos equivalentes a t existir em a_eq, t é inserido no final desse range | Um iterator apontando para o elemento recém-inserido | Logarítmica
a.emplace_hint(p, args) | `iterator` | | Equivalente a a.emplace(
std::forward<Args>(args)...), exceto que o elemento é inserido o mais próximo possível da posição imediatamente anterior a p | Um iterator apontando para o elemento com a chave equivalente ao elemento recém-inserido | Logarítmica em geral, mas constante amortizada se o elemento for inserido logo antes de p
a_uniq.insert(t) | std::pair<
iterator,
bool> | Se t for um rvalue não-const, `value_type` é MoveInsertable em `X`; caso contrário, `value_type` é CopyInsertable em `X` | Insere t se e somente se não houver nenhum elemento no container com chave equivalente à chave de t | O componente bool do par retornado é true se e somente se a inserção ocorrer, e o componente `iterator` do par aponta para o elemento com chave equivalente à chave de t | Logarítmica
a_eq.insert(t) | `iterator` | Se t for um rvalue não-const, `value_type` é MoveInsertable em `X`; caso contrário, `value_type` é CopyInsertable em `X` | Insere t e retorna o iterator apontando para o elemento recém-inserido. Se um range contendo elementos equivalentes a t existir em a_eq, t é inserido no final desse range | | Logarítmica
a.insert(p, t) | `iterator` | Se t for um rvalue não-const, `value_type` é MoveInsertable em `X`; caso contrário, `value_type` é CopyInsertable em `X` | Insere t se e somente se não houver nenhum elemento com chave equivalente à chave de t em containers com chaves únicas; sempre insere t em containers com chaves equivalentes. t é inserido o mais próximo possível da posição imediatamente anterior a p | Um iterator apontando para o elemento com chave equivalente à chave de t | Logarítmica em geral, mas constante amortizada se t for inserido logo antes de p
a.insert(i, j) | void | `value_type` é EmplaceConstructible em `X` a partir de *i. Nem i nem j são iterators em a | Insere cada elemento do range ``i`, `j`)` se e somente se não houver nenhum elemento com chave equivalente à chave desse elemento em containers com chaves únicas; sempre insere esse elemento em containers com chaves equivalentes | | N·log(a.size() + N), onde `N` tem o valor [std::distance(i, j)
a.insert_range(rg)
(desde C++23) | void | `value_type` é EmplaceConstructible em `X` a partir de *ranges::begin(rg). rg e a não se sobrepõem | Insere cada elemento de rg se e somente se não houver nenhum elemento com chave equivalente à chave desse elemento em containers com chaves únicas; sempre insere esse elemento em containers com chaves equivalentes | | N·log(a.size() + N), onde `N` tem o valor ranges::distance(rg)
a.insert(il) | | | a.insert(il.begin(), il.end())
a_uniq.insert(nh) | `insert_return_type` | nh está vazio ou a_uniq.get_allocator()
==
nh.get_allocator() é true | Se nh estiver vazio, não tem efeito. Caso contrário, insere o elemento possuído por nh se e somente se não houver nenhum elemento no container com uma chave equivalente a nh.key() | Se nh estiver vazio, `inserted` é false, `position` é end(), e `node` está vazio. Caso contrário, se a inserção ocorreu, `inserted` é true, `position` aponta para o elemento inserido, e `node` está vazio; se a inserção falhou, `inserted` é false, `node` tem o valor anterior de nh, e `position` aponta para um elemento com uma chave equivalente a nh.key() | Logarítmica
a_eq.insert(nh) | `iterator` | nh está vazio ou a_eq.get_allocator()
==
nh.get_allocator() é true | Se nh estiver vazio, não tem efeito e retorna a_eq.end(). Caso contrário, insere o elemento possuído por nh e retorna um iterator apontando para o elemento recém-inserido. Se um range contendo elementos com chaves equivalentes a nh.key() existir em a_eq, o elemento é inserido no final desse range. Garante: nh está vazio | | Logarítmica
a.insert(p, nh) | `iterator` | nh está vazio ou a.get_allocator()
==
nh.get_allocator() é true | Se nh estiver vazio, não tem efeito e retorna a.end(). Caso contrário, insere o elemento possuído por nh se e somente se não houver nenhum elemento com chave equivalente a nh.key() em containers com chaves únicas; sempre insere o elemento possuído por nh em containers com chaves equivalentes. O elemento é inserido o mais próximo possível da posição imediatamente anterior a p. Garante: nh está vazio se a inserção for bem-sucedida, inalterado se a inserção falhar | Um iterator apontando para o elemento com chave equivalente a nh.key() | Logarítmica em geral, mas constante amortizada se o elemento for inserido logo antes de p
a.extract(k) | `node_type` | | Remove o primeiro elemento no container com chave equivalente a k | Um `node_type` possuindo o elemento se encontrado, caso contrário um `node_type` vazio | log(a.size())
a_tran.extract(kx)
(desde C++23) | `node_type` | | Remove o primeiro elemento no container com chave r tal que !c(r, kx) && !c(kx, r) é true | Um `node_type` possuindo o elemento se encontrado, caso contrário um `node_type` vazio | log(a_tran.size())
a.extract(q) | `node_type` | | Remove o elemento apontado por q | Um `node_type` possuindo esse elemento | Constante amortizada
a.merge(a2) | void | a.get_allocator()
==
a2.get_allocator() | Tenta extrair cada elemento em a2 e inseri-lo em a usando o objeto de comparação de a. Em containers com chaves únicas, se houver um elemento em a com chave equivalente à chave de um elemento de a2, então esse elemento não é extraído de a2. Garante: Ponteiros e referências para os elementos transferidos de a2 referem-se a esses mesmos elementos, mas como membros de a. Iterators referindo-se aos elementos transferidos continuarão a referir-se aos seus elementos, mas agora se comportam como iterators em a, não em a2. Lança: Nada, a menos que o objeto de comparação lance uma exceção | | N·log(a.size() + N), onde `N` tem o valor a2.size()
a.erase(k) | `size_type` | | Apaga todos os elementos no container com chave equivalente a k | O número de elementos apagados | log(a.size())
+ a.count(k)
a_tran.erase(kx)
(desde C++23) | `size_type` | | Apaga todos os elementos no container com chave r tal que !c(r, kx) && !c(kx, r) é true | O número de elementos apagados | log(a_tran.size())
+ a_tran.count(kx)
a.erase(q) | `iterator` | | Apaga o elemento apontado por q | Um iterator apontando para o elemento imediatamente seguinte a q antes do elemento ser apagado. Se tal elemento não existir, retorna a.end() | Constante amortizada
a.erase(r) | `iterator` | | Apaga o elemento apontado por r | Um iterator apontando para o elemento imediatamente seguinte a r antes do elemento ser apagado. Se tal elemento não existir, retorna a.end() | Constante amortizada
a.erase(q1, q2) | `iterator` | | Apaga todos os elementos no range
``q1`, `q2`)` | Um iterator apontando para o elemento apontado por q2 antes de quaisquer elementos serem apagados. Se tal elemento não existir, a.end() é retornado | log(a.size()) + N, onde `N` tem o valor [std::distance(q1, q2)
a.clear() | | | a.erase(a.begin(), a.end()). Garante: a.empty() é true | | Linear em a.size()
b.find(k) | `iterator`; `const_iterator` para b constante | | | Um iterator apontando para um elemento com a chave equivalente a k, ou b.end() se tal elemento não for encontrado | Logarítmica
a_tran.find(ke) | `iterator`; `const_iterator` para a_tran constante | | | Um iterator apontando para um elemento com chave r tal que !c(r, ke) &&
!c(ke, r) é true, ou a_tran.end() se tal elemento não for encontrado | Logarítmica
b.count(k) | `size_type` | | | O número de elementos com chave equivalente a k | log(b.size())
+ b.count(k)
a_tran.count(ke) | `size_type` | | | O número de elementos com chave r tal que !c(r, ke) &&
!c(ke, r) | log(a_tran.size())
+ a_tran.count(ke)
b.contains(k) | bool | | return b.find(k) != b.end();
a_tran.contains(ke) | bool | | return
a_tran.find(ke) !=
a_tran.end();
b.lower_bound(k) | `iterator`; `const_iterator` para b constante | | | Um iterator apontando para o primeiro elemento com chave não menor que k, ou b.end() se tal elemento não for encontrado | Logarítmica
a_tran.lower_bound(kl) | `iterator`; `const_iterator` para a_tran constante | | | Um iterator apontando para o primeiro elemento com chave r tal que !c(r, kl), ou a_tran.end() se tal elemento não for encontrado | Logarítmica
b.upper_bound(k) | `iterator`; `const_iterator` para b constante | | | Um iterator apontando para o primeiro elemento com chave maior que k, ou b.end() se tal elemento não for encontrado | Logarítmica
a_tran.upper_bound(ku) | `iterator`; `const_iterator` para a_tran constante | | | Um iterator apontando para o primeiro elemento com chave r tal que c(ku, r), ou a_tran.end() se tal elemento não for encontrado | Logarítmica
b.equal_range(k) | std::pair<
iterator,
iterator>; std::pair<
const_iterator,
const_iterator> para b constante | | Equivalente a: return
std::make_pair(
b.lower_bound(k),
b.upper_bound(k)); | | Logarítmica
a_tran.equal_range(ke) | std::pair<
iterator,
iterator>; std::pair<
const_iterator,
const_iterator> para a_tran constante | | Equivalente a: return
std::make_pair(
a_tran.lower_bound(ke),
a_tran.upper_bound(ke)); | | Logarítmica
```

#### Iterators

Os iterators de containers associativos satisfazem os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

Para containers associativos onde `value_type` é o mesmo que `key_type`, tanto `iterator` quanto `const_iterator` são iterators constantes. Não é especificado se `iterator` e `const_iterator` são ou não do mesmo tipo.

Os iterators de containers associativos iteram através dos containers na ordem não-descendente das chaves, onde não-descendente é definido pela comparação que foi usada para construir os containers. Ou seja, dado

  * a, um container associativo
  * i e j, iterators desreferenciáveis para a.

Se a distância de i para j for positiva, então a.value_comp()(*j, *i) == false. Além disso, se a for um container associativo com chaves únicas, a condição mais forte a.value_comp()(*i, *j) != false é válida.

| Esta seção está incompleta
Razão: Finalizar requisitos.

### Biblioteca padrão

Os seguintes containers da biblioteca padrão satisfazem os requisitos de AssociativeContainer:

[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(template de classe)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(template de classe)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(template de classe)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(template de classe)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 354](<https://cplusplus.github.io/LWG/issue354>) | C++98 | `lower_bound` e `upper_bound` não
retornavam o iterator final se nenhum elemento fosse encontrado | eles retornam o iterator
final neste caso
[LWG 589](<https://cplusplus.github.io/LWG/issue589>) | C++98 | os elementos que i e j referiam-se
tinham o tipo `X::value_type` | os elementos são implicitamente
conversíveis para `X::value_type`
  *[_(as is)_]: A::pointer