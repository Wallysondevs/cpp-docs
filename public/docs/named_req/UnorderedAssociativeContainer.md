# Requisitos nomeados C++: UnorderedAssociativeContainer (desde C++11)

Contêineres associativos não ordenados são [Containers](<#/doc/named_req/Container>) que fornecem busca rápida de objetos baseada em chaves. A complexidade no pior caso é linear, mas em média é muito mais rápida para a maioria das operações.

Contêineres associativos não ordenados são parametrizados por `Key`; `Hash`, um objeto de função [Hash](<#/doc/named_req/Hash>) que atua como função hash em `Key`; e `Pred`, um [BinaryPredicate](<#/doc/named_req/BinaryPredicate>) que avalia a equivalência entre `Key`s. [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>) também possuem um tipo mapeado `T` associado à `Key`.

Se duas `Key`s são iguais de acordo com `Pred`, `Hash` deve retornar o mesmo valor para ambas as chaves.

Se ambos `Hash::is_transparent` e `Pred::is_transparent` existem e cada um nomeia um tipo, as funções membro `find`, `contains`, `count`, `equal_range` e `bucket` aceitam argumentos de tipos diferentes de `Key` e esperam que `Hash` seja chamável com valores desses tipos, e que `Pred` seja uma função de comparação transparente como std::equal_to<>. | (desde C++20)

[std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_set](<#/doc/container/unordered_set>) podem conter no máximo um elemento com uma dada chave, [std::unordered_multiset](<#/doc/container/unordered_multiset>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>) podem, em vez disso, ter múltiplos elementos com a mesma chave (os quais devem sempre ser adjacentes nas iterações).

Para [std::unordered_set](<#/doc/container/unordered_set>) e [std::unordered_multiset](<#/doc/container/unordered_multiset>), o tipo de valor é o mesmo que o tipo de chave e ambos `iterator` e `const_iterator` são iteradores constantes. Para [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>), o tipo de valor é [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;.

Elementos em um contêiner associativo não ordenado são organizados em buckets; chaves com o mesmo hash acabarão no mesmo bucket. O número de buckets é aumentado quando o tamanho do contêiner cresce para manter o número médio de elementos em cada bucket abaixo de um certo valor.

O rehashing invalida iteradores e pode fazer com que os elementos sejam reorganizados em diferentes buckets, mas não invalida referências aos elementos.

Contêineres associativos não ordenados satisfazem os requisitos de [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>). Para [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>), os requisitos de `value_type` em [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) se aplicam a `key_type` e `mapped_type` (não a `value_type`).

### Requisitos

##### Legenda
---
`X` | Uma classe de contêiner associativo não ordenado
---|---
a | Um valor do tipo `X`
a2 | Um valor de um tipo com [nós compatíveis com o tipo](<#/doc/container/node_handle>) `X`
b | Um valor do tipo `X` ou `const X`
a_uniq | Um valor do tipo `X` quando `X` suporta chaves únicas
a_eq | Um valor do tipo `X` quando `X` suporta chaves equivalentes
a_tran | Um valor do tipo `X` ou `const X` quando os identificadores qualificados `X::key_equal::is_transparent` e `X::hasher::is_transparent` são ambos válidos e denotam [tipos](<#/doc/language/template_argument_deduction>)
i, j | Iteradores de entrada que se referem a `value_type`
`[`i`, `j`)` | Um range válido
rg (desde C++23) | Um valor de um tipo `R` que modela [`_container-compatible-range_`](<#/doc/ranges/to>)`<value_type>`
p, q2 | Iteradores constantes válidos para a
q, q1 | Iteradores constantes válidos e desreferenciáveis para a
r | Um iterador válido e desreferenciável para a
`[`q1`, `q2`)` | Um range válido em a
il | Um valor do tipo [std::initializer_list](<#/doc/utility/initializer_list>)<value_type>
t | Um valor do tipo `X::value_type`
k | Um valor do tipo `key_type`
hf | Um valor do tipo `hasher` ou `const hasher`
eq | Um valor do tipo `key_equal` ou `const key_equal`
ke | Um valor tal que
  * eq(r1, ke) == eq(ke, r1),
  * hf(r1) == hf(ke) se eq(r1, ke) for verdadeiro, e
  * se quaisquer dois de eq(r1, ke), eq(r2, ke) e eq(r1, r2) forem verdadeiros, então todos os três são verdadeiros,
onde r1 e r2 são chaves de elementos em a_tran
kx (desde C++23) | Um valor tal que
  * eq(r1, kx) == eq(kx, r1),
  * hf(r1) == hf(kx) se eq(r1, kx) for verdadeiro,
  * se quaisquer dois de eq(r1, kx), eq(r2, kx) e eq(r1, r2) forem verdadeiros, então todos os três são verdadeiros, e
  * kx não é conversível para `iterator` nem para `const_iterator`,
onde r1 e r2 são chaves de elementos em a_tran
n | Um valor do tipo `size_type`
---|---
z | Um valor do tipo float
nh (desde C++17) | Um rvalue do tipo X::node_type

#### Tipos membro

Nome | Tipo | Requisitos | Notas
---|---|---|---
`X::key_type` | `Key`
`X::mapped_type` | `T` | Apenas para [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>) |
`X::value_type` | `Key` | Apenas para [std::unordered_set](<#/doc/container/unordered_set>) e [std::unordered_multiset](<#/doc/container/unordered_multiset>). [Erasable](<#/doc/named_req/Erasable>) em `X` |
[std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt; | Apenas para [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>). [Erasable](<#/doc/named_req/Erasable>) em `X` |
`X::hasher` | `Hash` | [Hash](<#/doc/named_req/Hash>) |
`X::key_equal` | `Pred` | [CopyConstructible](<#/doc/named_req/CopyConstructible>); [BinaryPredicate](<#/doc/named_req/BinaryPredicate>) que recebe dois argumentos do tipo `Key` e expressa uma relação de equivalência |
`X::local_iterator` | [LegacyIterator](<#/doc/named_req/Iterator>) | Categoria e tipos são os mesmos que `X::iterator` | Pode ser usado para iterar através de um único bucket, mas não entre buckets
`X::const_local_iterator` | [LegacyIterator](<#/doc/named_req/Iterator>) | Categoria e tipos são os mesmos que `X::const_iterator`
`X::node_type` (desde C++17) | Uma especialização do template de classe [node-handle](<#/doc/container/node_handle>) | Os tipos aninhados públicos são os mesmos que os tipos correspondentes em `X` |

#### Funções membro e operadores

Expressão | Resultado | Pré-condições | Efeitos | Retorna | Complexidade
---|---|---|---|---|---
X(n, hf, eq) | | | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e eq como o predicado de igualdade de chave | | O(n)
X(n, hf) | | `key_equal` é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e key_equal() como o predicado de igualdade de chave | | O(n)
X(n) | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) | Constrói um contêiner vazio com pelo menos n buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave | | O(n)
X a = X(); X a; | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) | Constrói um contêiner vazio com um número não especificado de buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave | | Constante
X(i, j, n, hf, eq) | | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *i | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e eq como o predicado de igualdade de chave, e insere elementos de `[`i`, `j`)` nele | | Caso médio O(N) (N é [std::distance](<#/doc/iterator/distance>)(i, j)), pior caso O(N2)
X(i, j, n, hf) | | `key_equal` é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *i | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de `[`i`, `j`)` nele | | Caso médio O(N) (N é [std::distance](<#/doc/iterator/distance>)(i, j)), pior caso O(N2)
X(i, j, n) | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *i | Constrói um contêiner vazio com pelo menos n buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de `[`i`, `j`)` nele | | Caso médio O(N) (N é [std::distance](<#/doc/iterator/distance>)(i, j)), pior caso O(N2)
X(i, j) | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *i | Constrói um contêiner vazio com um número não especificado de buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de `[`i`, `j`)` nele | | Caso médio O(N) (N é [std::distance](<#/doc/iterator/distance>)(i, j)), pior caso O(N2)
X([std::from_range](<#/doc/ranges/from_range>), rg, n, hf, eq) (desde C++23) | | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg) | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e eq como o predicado de igualdade de chave, e insere elementos de rg nele | | Caso médio O(N) (N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg)), pior caso O(N2)
X([std::from_range](<#/doc/ranges/from_range>), rg, n, hf) (desde C++23) | | `key_equal` é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg) | Constrói um contêiner vazio com pelo menos n buckets, usando hf como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de rg nele | | Caso médio O(N) (N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg)), pior caso O(N2)
X([std::from_range](<#/doc/ranges/from_range>), rg, n) (desde C++23) | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg) | Constrói um contêiner vazio com pelo menos n buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de rg nele | | Caso médio O(N) (N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg)), pior caso O(N2)
X([std::from_range](<#/doc/ranges/from_range>), rg) (desde C++23) | | `hasher` e `key_equal` são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg) | Constrói um contêiner vazio com um número não especificado de buckets, usando hasher() como a função hash e key_equal() como o predicado de igualdade de chave, e insere elementos de rg nele | | Caso médio O(N) (N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg)), pior caso O(N2)
X(il) | | | X(il.begin(), il.end())
X(il, n) | | | X(il.begin(), il.end(), n)
X(il, n, hf) | | | X(il.begin(), il.end(), n, hf)
X(il, n, hf, eq) | | | X(il.begin(), il.end(), n, hf, eq)
X(b) | | | [Container](<#/doc/named_req/Container>); Copia a função hash, o predicado e o fator de carga máximo | | Caso médio linear em b.size(), pior caso O(N2)
a = b | `X&` | | [Container](<#/doc/named_req/Container>); copia a função hash, o predicado e o fator de carga máximo | | Caso médio linear em b.size(), pior caso O(N2)
a = il | `X&` | `value_type` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `X` e [CopyAssignable](<#/doc/named_req/CopyAssignable>) | Atribui o range `[`il.begin()`, `il.end()`)` a a. Todos os elementos existentes de a são atribuídos ou destruídos | | Caso médio linear em il.size(), pior caso O(N2)
b.hash_function() | `hasher` | | | Função hash de b | Constante
b.key_eq() | `key_equal` | | | Predicado de igualdade de chave de b | Constante
a_uniq.emplace(args) | [std::pair](<#/doc/utility/pair>)<iterator, bool> | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de args | Insere um objeto `value_type` t construído com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... se e somente se não houver nenhum elemento no contêiner com chave equivalente à chave de t | O componente bool do par retornado é verdadeiro se e somente se a inserção ocorrer, e o componente iterator do par aponta para o elemento com chave equivalente à chave de t | Caso médio O(1), pior caso O(a_uniq.size())
a_eq.emplace(args) | `iterator` | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de args | Insere um objeto `value_type` t construído com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... | Um iterador apontando para o elemento recém-inserido | Caso médio O(1), pior caso O(a_eq.size())
a.emplace_hint(p, args) | `iterator` | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de args | a.emplace([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...) | Um iterador apontando para o elemento com a chave equivalente ao elemento recém-inserido. O `const_iterator` p é uma dica que aponta para onde a busca deve começar. As implementações podem ignorar a dica | Caso médio O(1), pior caso O(a.size())
a_uniq.insert(t) | [std::pair](<#/doc/utility/pair>)<iterator, bool> | Se t for um rvalue não-const, `value_type` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `X`; caso contrário, `value_type` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `X` | Insere t se e somente se não houver nenhum elemento no contêiner com chave equivalente à chave de t | O componente bool do par retornado indica se a inserção ocorreu, e o componente `iterator` aponta para o elemento com chave equivalente à chave de t | Caso médio O(1), pior caso O(a_uniq.size())
a_eq.insert(t) | `iterator` | Se t for um rvalue não-const, `value_type` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `X`; caso contrário, `value_type` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `X` | Insere t | Um iterador apontando para o elemento recém-inserido | Caso médio O(1), pior caso O(a_eq.size())
a.insert(p, t) | `iterator` | Se t for um rvalue não-const, `value_type` é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `X`; caso contrário, `value_type` é [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `X` | a.insert(t). O iterador p é uma dica que aponta para onde a busca deve começar. As implementações podem ignorar a dica | Um iterador apontando para o elemento com a chave equivalente à de t | Caso médio O(1), pior caso O(a.size())
a.insert(i, j) | void | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *i. Nem i nem j são iteradores em a | a.insert(t) para cada elemento em `[`i`, `j`)` | | Caso médio O(N), onde N é [std::distance](<#/doc/iterator/distance>)(i, j), pior caso O(N·(a.size() + 1))
a.insert_range(rg) (desde C++23) | void | `value_type` é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `X` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). rg e a não se sobrepõem | a.insert(t) para cada elemento t em rg | | Caso médio O(N), onde N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg), pior caso O(N·(a.size() + 1))
a.insert(il) | | | a.insert(il.begin(), il.end())
a.insert(il, n) | | | a.insert(il.begin(), il.end(), n)
a.insert(il, n, hf) | | | a.insert(il.begin(), il.end(), n, hf)
a.insert(il, n, hf, eq) | | | a.insert(il.begin(), il.end(), n, hf, eq)
a_uniq.insert(nh) (desde C++17) | `insert_return_type` | nh está vazio ou a_uniq.get_allocator() == nh.get_allocator() é verdadeiro | Se nh estiver vazio, não tem efeito. Caso contrário, insere o elemento possuído por nh se e somente se não houver nenhum elemento no contêiner com uma chave equivalente a nh.key(). Garante: Se nh estiver vazio, inserted é falso, position é end(), e node está vazio. Caso contrário, se a inserção ocorreu, inserted é verdadeiro, position aponta para o elemento inserido, e node está vazio; se a inserção falhou, inserted é falso, node tem o valor anterior de nh, e position aponta para um elemento com uma chave equivalente a nh.key() | | Caso médio O(1), pior caso O(a_uniq.size())
a_eq.insert(nh) (desde C++17) | `iterator` | nh está vazio ou a_eq.get_allocator() == nh.get_allocator() é verdadeiro | Se nh estiver vazio, não tem efeito e retorna a_eq.end(). Caso contrário, insere o elemento possuído por nh e retorna um iterador apontando para o elemento recém-inserido. Garante: nh está vazio | | Caso médio O(1), pior caso O(a_eq.size())
a.insert(q, nh) (desde C++17) | `iterator` | nh está vazio ou a.get_allocator() == nh.get_allocator() é verdadeiro | Se nh estiver vazio, não tem efeito e retorna a.end(). Caso contrário, insere o elemento possuído por nh se e somente se não houver nenhum elemento com chave equivalente a nh.key() em contêineres com chaves únicas; sempre insere o elemento possuído por nh em contêineres com chaves equivalentes. O iterador q é uma dica que aponta para onde a busca deve começar. As implementações podem ignorar a dica. Garante: nh está vazio se a inserção for bem-sucedida, inalterado se a inserção falhar | Um iterador apontando para o elemento com chave equivalente a nh.key() | Caso médio O(1), pior caso O(a.size())
a.extract(k) (desde C++17) | `node_type` | | Remove um elemento no contêiner com chave equivalente a k | Um `node_type` possuindo o elemento se encontrado, caso contrário um `node_type` vazio | Caso médio O(1), pior caso O(a.size())
a_tran.extract(kx) (desde C++23) | `node_type` | | Remove um elemento no contêiner com chave equivalente a kx | Um `node_type` possuindo o elemento se encontrado, caso contrário um `node_type` vazio | Caso médio O(1), pior caso O(a_tran.size())
a.extract(q) (desde C++17) | `node_type` | | Remove o elemento apontado por q | Um `node_type` possuindo esse elemento | Caso médio O(1), pior caso O(a.size())
a.merge(a2) (desde C++17) | void | a.get_allocator() == a2.get_allocator() | Tenta extrair cada elemento em a2 e inseri-lo em a usando a função hash e o predicado de igualdade de chave de a. Em contêineres com chaves únicas, se houver um elemento em a com chave equivalente à chave de um elemento de a2, então esse elemento não é extraído de a2. Garante: Ponteiros e referências aos elementos transferidos de a2 referem-se a esses mesmos elementos, mas como membros de a. Iteradores que se referem aos elementos transferidos e todos os iteradores que se referem a a serão invalidados, mas os iteradores para elementos restantes em a2 permanecerão válidos | | Caso médio O(N), onde N é a2.size(), pior caso O(N·(a.size() + 1))
a.erase(k) | `size_type` | | Apaga todos os elementos com chave equivalente a k | O número de elementos apagados | Caso médio O(a.count(k)), pior caso O(a.size())
a_tran.erase(kx) (desde C++23) | `size_type` | | Apaga todos os elementos com chave equivalente a kx | O número de elementos apagados | Caso médio O(a_tran.count(kx)), pior caso O(a_tran.size())
a.erase(q) | `iterator` | | Apaga o elemento apontado por q | O iterador imediatamente seguinte a q antes da exclusão | Caso médio O(1), pior caso O(a.size())
a.erase(r) (desde C++17) | `iterator` | | Apaga o elemento apontado por r | O iterador imediatamente seguinte a r antes da exclusão | Caso médio O(1), pior caso O(a.size())
a.erase(q1, q2) | `iterator` | | Apaga todos os elementos no range `[`q1`, `q2`)` | O iterador imediatamente seguinte aos elementos apagados antes da exclusão | Caso médio linear em [std::distance](<#/doc/iterator/distance>)(q1, q2), pior caso O(a.size())
a.clear() | void | | Apaga todos os elementos no contêiner. Garante: a.empty() é verdadeiro | | Linear em a.size()
b.find(k) | `iterator`; `const_iterator` para b constante | | | Um iterador apontando para um elemento com chave equivalente a k, ou b.end() se nenhum elemento desse tipo existir | Caso médio O(1), pior caso O(b.size())
a_tran.find(ke) (desde C++17)? | `iterator`; `const_iterator` para a_tran constante | | | Um iterador apontando para um elemento com chave equivalente a ke, ou a_tran.end() se nenhum elemento desse tipo existir | Caso médio O(1), pior caso O(a_tran.size())
b.count(k) | `size_type` | | | O número de elementos com chave equivalente a k | Caso médio O(b.count(k)), pior caso O(b.size())
a_tran.count(ke) (desde C++17)? | `size_type` | | | O número de elementos com chave equivalente a ke | Caso médio O(a_tran.count(ke)), pior caso O(a_tran.size())
b.contains(k) (desde C++20)? | | | b.find(k) != b.end()
a_tran.contains(ke) (desde C++20)? | | | a_tran.find(ke) != a_tran.end()
b.equal_range(k) | [std::pair](<#/doc/utility/pair>)<iterator, iterator>; [std::pair](<#/doc/utility/pair>)<const_iterator, const_iterator> para b constante | | | Um range contendo todos os elementos com chaves equivalentes a k. Retorna [std::make_pair](<#/doc/utility/pair/make_pair>)(b.end(), b.end()) se nenhum elemento desse tipo existir | Caso médio O(b.count(k)), pior caso O(b.size())
a_tran.equal_range(ke) (desde C++20)? | [std::pair](<#/doc/utility/pair>)<iterator, iterator>; [std::pair](<#/doc/utility/pair>)<const_iterator, const_iterator> para a_tran constante | | | Um range contendo todos os elementos com chaves equivalentes a ke. Retorna [std::make_pair](<#/doc/utility/pair/make_pair>)(a_tran.end(), a_tran.end()) se nenhum elemento desse tipo existir | Caso médio O(a_tran.count(ke)), pior caso O(a_tran.size())
b.bucket_count() | `size_type` | | | O número de buckets que b contém | Constante
b.max_bucket_count() | `size_type` | | | Um limite superior para o número de buckets que b pode conter | Constante
b.bucket(k) | `size_type` | b.bucket_count() > 0 | | O índice do bucket no qual elementos com chaves equivalentes a k seriam encontrados, se tal elemento existisse. O valor de retorno está em `[`​0​`, `b.bucket_count()`)` | Constante
a_tran.bucket(ke) | `size_type` | a_tran.bucket_count() > 0 | | O índice do bucket no qual elementos com chaves equivalentes a ke seriam encontrados, se tal elemento existisse. O valor de retorno deve estar no range `[`​0​`, `a_tran.bucket_count()`)` | Constante
b.bucket_size(n) | `size_type` | n está em `[`​0​`, `b.bucket_count()`)` | | O número de elementos no n-ésimo bucket | O(b.bucket_size(n))
b.begin(n) | `local_iterator`; `const_local_iterator` para b constante | n está em `[`​0​`, `b.bucket_count()`)` | | Um iterador referindo-se ao primeiro elemento no bucket. Se o bucket estiver vazio, então b.begin(n) == b.end(n) | Constante
b.end(n) | `local_iterator`; `const_local_iterator` para b constante | n está em `[`​0​`, `b.bucket_count()`)` | | Um iterador que é o valor "past-the-end" para o bucket | Constante
b.cbegin(n) | `const_local_iterator` | n está em `[`​0​`, `b.bucket_count()`)` | | Um iterador referindo-se ao primeiro elemento no bucket. Se o bucket estiver vazio, então b.cbegin(n) == b.cend(n) | Constante
b.cend(n) | `const_local_iterator` | n está em `[`​0​`, `b.bucket_count()`)` | | Um iterador que é o valor "past-the-end" para o bucket | Constante
b.load_factor() | float | | | O número médio de elementos por bucket | Constante
b.max_load_factor() | float | | | Um número positivo que o contêiner tenta manter o fator de carga menor ou igual a. O contêiner aumenta automaticamente o número de buckets conforme necessário para manter o fator de carga abaixo desse número | Constante
a.max_load_factor(z) | void | z é positivo. Pode alterar o fator de carga máximo do contêiner, usando z como uma dica | | | Constante
a.rehash(n) | void | | Garante: a.bucket_count() >= a.size() / a.max_load_factor() e a.bucket_count() >= n | | Caso médio linear em a.size(), pior caso O(N2)
a.reserve(n) | | | a.rehash([std::ceil](<#/doc/numeric/math/ceil>)(n / a.max_load_factor()))

| Esta seção está incompleta
Razão: Requisitos relativos às funções membro.

### Biblioteca padrão

Os seguintes contêineres da biblioteca padrão satisfazem os requisitos de UnorderedAssociativeContainer:

[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, hashadas por chaves
(template de classe)
[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, hashadas por chaves
(template de classe)
[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, hashados por chaves, chaves são únicas
(template de classe)
[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, hashados por chaves
(template de classe)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2156](<https://cplusplus.github.io/LWG/issue2156>) | C++11 | o fator de carga após o rehashing só poderia ser estritamente menor que o fator de carga máximo | permitido ser igual
*[_(como está)_]: A::pointer