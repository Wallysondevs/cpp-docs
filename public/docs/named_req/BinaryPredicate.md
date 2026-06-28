# Requisitos nomeados C++: BinaryPredicate

**BinaryPredicate** é um conjunto de requisitos esperados por algumas das facilidades da biblioteca padrão a partir dos argumentos fornecidos pelo usuário.

Dado um BinaryPredicate `bin_pred` e um par de iterators `iter1` e `iter2` ou um iterator `iter` e um valor `value` (possivelmente `const`), o tipo e a categoria de valor da expressão bin_pred(*iter1, *iter2) ou, respectivamente, bin_pred(*iter, value), devem satisfazer os requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).

Além disso, a avaliação dessa expressão não é permitida para chamar funções membro não-const dos iterators desreferenciados; sintaticamente, o predicate deve aceitar argumentos de objeto `const`, com o mesmo comportamento independentemente de seus argumentos serem `const` ou não-`const`.

### Requisitos

*   [Predicate](<#/doc/named_req/Predicate>)
*   [CopyConstructible](<#/doc/named_req/CopyConstructible>) (a menos que especificado de outra forma)

### Biblioteca padrão

As seguintes facilidades da biblioteca padrão esperam um BinaryPredicate que não seja do tipo [Compare](<#/doc/named_req/Compare>).

[ unique](<#/doc/container/forward_list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::forward_list<T,Allocator>`)
[ unique](<#/doc/container/list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::list<T,Allocator>`)
[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ find_first_of](<#/doc/algorithm/find_first_of>) | procura por qualquer um de um conjunto de elementos
(modelo de função)
[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicate)
(modelo de função)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ is_permutation](<#/doc/algorithm/is_permutation>)(desde C++11) | determina se uma sequência é uma permutação de outra sequência
(modelo de função)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função)
[ unique_copy](<#/doc/algorithm/unique_copy>) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(modelo de função)
[ not2](<#/doc/utility/functional/not2>)(obsoleto desde C++17)(removido desde C++20) | constrói um objeto [std::binary_negate](<#/doc/utility/functional/binary_negate>) personalizado
(modelo de função)
[ unordered_set](<#/doc/container/unordered_set>)(desde C++11) | coleção de chaves únicas, hashadas por chaves
(modelo de classe)
[ unordered_map](<#/doc/container/unordered_map>)(desde C++11) | coleção de pares chave-valor, hashados por chaves, chaves são únicas
(modelo de classe)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(desde C++11) | coleção de chaves, hashadas por chaves
(modelo de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(desde C++11) | coleção de pares chave-valor, hashados por chaves
(modelo de classe)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | a convertibilidade dos tipos de retorno para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos
---|---|---|---
[LWG 3031](<https://cplusplus.github.io/LWG/issue3031>) | C++98 | os requisitos para valores `const` eram insuficientes | requisitos fortalecidos
*[_(as is)_]: A::pointer