# C++ requisitos nomeados: AllocatorAwareContainer (desde C++11)

Um **AllocatorAwareContainer** é um [Container](<#/doc/named_req/Container>) que mantém uma instância de um [Allocator](<#/doc/named_req/Allocator>) e usa essa instância em todas as suas funções membro para alocar e desalocar memória e para construir e destruir objetos nessa memória (tais objetos podem ser elementos do container, nós, ou, para containers não ordenados, arrays de buckets), exceto que as especializações de [std::basic_string](<#/doc/string/basic_string>) não usam os allocators para construção/destruição de seus elementos (desde C++23).

As seguintes regras se aplicam à construção de containers:

  * Construtores de cópia de AllocatorAwareContainers obtêm suas instâncias do allocator chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::select_on_container_copy_construction no allocator do container que está sendo copiado.
  * Construtores de movimento (move constructors) obtêm suas instâncias de allocators através de move-construction a partir do allocator pertencente ao container antigo.
  * Todos os outros construtores recebem um parâmetro const allocator_type&.

A única maneira de substituir um allocator é por copy-assignment, move-assignment e swap:

  * Copy-assignment substituirá o allocator apenas se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_copy_assignment::value for true.
  * Move-assignment substituirá o allocator apenas se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_move_assignment::value for true.
  * Swap substituirá o allocator apenas se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_swap::value for true. Especificamente, ele trocará as instâncias do allocator através de uma chamada não qualificada para a função membro não-membro swap, veja [Swappable](<#/doc/named_req/Swappable>).

Nota: O comportamento de trocar dois containers com allocators desiguais se `propagate_on_container_swap` for false é indefinido.

  * O acessor `get_allocator()` obtém uma cópia do allocator que foi usado para construir o container ou instalado pela operação de substituição de allocator mais recente.

### Requisitos

Um tipo satisfaz AllocatorAwareContainer se ele satisfaz [Container](<#/doc/named_req/Container>) e, dados os seguintes tipos e valores, os requisitos semânticos e de complexidade nas tabelas abaixo são satisfeitos:

Tipo | Definição
---|---
`X` | um tipo AllocatorAwareContainer
`T` | o `value_type` de `X`
`A` | o tipo de allocator usado por `X`
Valor | Definição
a, b | lvalues não-const do tipo `X`
c | um lvalue do tipo const X
t | um lvalue ou um rvalue const do tipo `X`
rv | um rvalue não-const do tipo `X`
m | um valor do tipo `A`

#### Tipos

Nome | Tipo | Requisito
---|---|---
typename X::allocator_type | `A` | `X::allocator_type::value_type` e `X::value_type` são os mesmos.

#### Declarações

```cpp
Declaração | Semântica | Complexidade
X u; <br> X u = X(); | Pré-condição | `A` é DefaultConstructible. | Constante
| Pós-condição | u.empty() e u.get_allocator() == A() são ambos verdadeiros.
X u(m); | Pós-condição | u.empty() e u.get_allocator() == m são ambos verdadeiros. | Constante
X u(t, m); | Pré-condição | `T` é CopyInsertable em `X`. | Linear
| Pós-condição | u == t e u.get_allocator() == m são ambos verdadeiros.
X u(rv); | Pós-condição
```
  * u tem os mesmos elementos que rv tinha antes desta construção.
  * O valor de u.get_allocator() é o mesmo que o valor de rv.get_allocator() antes desta construção.
```cpp
| Constante
X u(rv, m); | Pré-condição | `T` é MoveInsertable em `X`.
```
  * Constante se m == rv.get_allocator() for true.
  * Caso contrário, linear.
|
| Pós-condição |
  * u tem os mesmos elementos, ou cópias dos elementos, que rv tinha antes desta construção.
  * u.get_allocator() == m é true.
|

#### Expressões

Expressão | Tipo | Semântica | Complexidade
---|---|---|---
c.get_allocator() | `A` | Nenhum requisito semântico direto. | Constante
a = t | `X&` | Pré-condição | `T` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `X` e [CopyAssignable](<#/doc/named_req/CopyAssignable>). | Linear
| Pós-condição | a == t é true. |
a = rv | `X&` | Pré-condição | Se o allocator **não** for substituído por move-assignment (veja [acima](<#/doc/named_req/AllocatorAwareContainer>)), então `T` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `X` e [MoveAssignable](<#/doc/named_req/MoveAssignable>). | Linear
| Efeito | Todos os elementos existentes de a são move assigned ou destruídos. |
| Pós-condição | Se a e rv não se referem ao mesmo objeto, a é igual ao valor que rv tinha antes da atribuição. |
a.swap(b) | void | Efeito | Troca o conteúdo de a e b. | Constante

### Notas

AllocatorAwareContainers sempre chamam [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::construct(m, p, args) para construir um objeto do tipo `T` em p usando args, com m == get_allocator(). O `construct` padrão em [std::allocator](<#/doc/memory/allocator>) chama ::new((void*)p) T(args)(até C++20)[std::allocator](<#/doc/memory/allocator>) não possui membro `construct` e [std::construct_at](<#/doc/memory/construct_at>)(p, args) é chamado ao construir elementos (desde C++20), mas allocators especializados podem escolher uma definição diferente.

### Biblioteca padrão

Todos os tipos de string e containers da biblioteca padrão (exceto [std::array](<#/doc/container/array>) e [std::inplace_vector](<#/doc/container/inplace_vector>)) são AllocatorAwareContainers:

[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(modelo de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(modelo de classe)
[ forward_list](<#/doc/container/forward_list>)(C++11) | lista simplesmente encadeada
(modelo de classe)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(modelo de classe)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(modelo de classe)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(modelo de classe)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(modelo de classe)
[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(modelo de classe)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(modelo de classe)
[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, hash por chaves, chaves são únicas
(modelo de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, hash por chaves
(modelo de classe)
[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, hash por chaves
(modelo de classe)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, hash por chaves
(modelo de classe)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2839](<https://cplusplus.github.io/LWG/issue2839>) | C++11 | self move assignment de containers padrão não era permitido | permitido, mas o resultado é não especificado