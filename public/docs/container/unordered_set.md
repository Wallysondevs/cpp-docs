# std::unordered_set

Definido no cabeçalho `[<unordered_set>](<#/doc/header/unordered_set>)`

```c
template<
class Key,
class Hash = std::hash<Key>,
class KeyEqual = std::equal_to<Key>,
class Allocator = std::allocator<Key>
> class unordered_set;
namespace pmr {
template<
class Key,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>
> using unordered_set = std::unordered_set<Key, Hash, Pred,
std::pmr::polymorphic_allocator<Key>>;
}
```

`std::unordered_set` é um container associativo que contém um conjunto de objetos únicos do tipo `Key`. Busca, inserção e remoção possuem complexidade de tempo constante em média.

Internamente, os elementos não são ordenados em nenhuma ordem particular, mas organizados em buckets. O bucket em que um elemento é colocado depende inteiramente do hash de seu valor. Isso permite acesso rápido a elementos individuais, já que, uma vez que um hash é computado, ele se refere ao bucket exato onde o elemento é colocado.

Os elementos do container não podem ser modificados (mesmo por iterators não-const) pois a modificação poderia alterar o hash de um elemento e corromper o container.

`std::unordered_set` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>).

### Invalidação de Iterator

Operações | Invalidado
---|---
Todas as operações somente leitura, [swap](<#/doc/container/unordered_set/swap>), [std::swap](<#/doc/utility/swap>) | Nunca
[clear](<#/doc/container/unordered_set/clear>), [rehash](<#/doc/container/unordered_set/rehash>), [reserve](<#/doc/container/unordered_set/reserve>), [operator=](<#/>) | Sempre
[insert](<#/doc/container/unordered_set/insert>), [emplace](<#/doc/container/unordered_set/emplace>), [emplace_hint](<#/doc/container/unordered_set/emplace_hint>) | Apenas se causar rehash
[erase](<#/doc/container/unordered_set/erase>) | Apenas para o elemento apagado

#### Notas

*   As funções swap não invalidam nenhum dos iterators dentro do container, mas invalidam o iterator que marca o fim da região de swap.

*   Referências e ponteiros para dados armazenados no container são invalidados apenas ao apagar esse elemento, mesmo quando o iterator correspondente é invalidado.

*   Após a atribuição de movimento do container, a menos que a atribuição de movimento elemento a elemento seja forçada por allocators incompatíveis, referências, ponteiros e iterators (exceto o iterator past-the-end) para o container movido-de permanecem válidos, mas referem-se a elementos que agora estão em `*this`.

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membro

Tipo | Definição
---|---
`key_type` | `Key`
`value_type` | `Key`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`hasher` | `Hash`
`key_equal` | `KeyEqual`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer
`iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) constante para `value_type`
`const_iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para const value_type
`local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, ponteiro e
tipos de referência são os mesmos que `iterator`. Este iterator
pode ser usado para iterar através de um único bucket, mas não entre buckets
`const_local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, ponteiro e
tipos de referência são os mesmos que `const_iterator`. Este iterator
pode ser usado para iterar através de um único bucket, mas não entre buckets
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container
---|---
`insert_return_type` (desde C++17) | tipo que descreve o resultado da inserção de um `node_type`, uma especialização de
template&lt;class Iter, class NodeType&gt;
struct /*unspecified*/
{
Iter position;
bool inserted;
NodeType node;
};
instanciado com os argumentos de template `iterator` e `node_type`.

### Funções membro

[ (construtor)](<#/doc/container/unordered_set/unordered_set>) | constrói o `unordered_set`
(função membro pública)
[ (destrutor)](<#/doc/container/unordered_set/~unordered_set>) | destrói o `unordered_set`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/unordered_set/get_allocator>) | retorna o allocator associado
(função membro pública)

##### Iterators

[ begin/cbegin](<#/doc/container/unordered_set/begin>) | retorna um iterator para o início
(função membro pública)
[ end/cend](<#/doc/container/unordered_set/end>) | retorna um iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/unordered_set/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/unordered_set/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/unordered_set/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/unordered_set/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/unordered_set/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/unordered_set/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/unordered_set/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_set/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/unordered_set/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/unordered_set/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/unordered_set/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/unordered_set/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/unordered_set/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/unordered_set/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_set/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Interface de Bucket

[ begin(size_type)/cbegin(size_type)](<#/doc/container/unordered_set/begin2>) | retorna um iterator para o início do bucket especificado
(função membro pública)
[ end(size_type)/cend(size_type)](<#/doc/container/unordered_set/end2>) | retorna um iterator para o fim do bucket especificado
(função membro pública)
[ bucket_count](<#/doc/container/unordered_set/bucket_count>) | retorna o número de buckets
(função membro pública)
[ max_bucket_count](<#/doc/container/unordered_set/max_bucket_count>) | retorna o número máximo de buckets
(função membro pública)
[ bucket_size](<#/doc/container/unordered_set/bucket_size>) | retorna o número de elementos em um bucket específico
(função membro pública)
[ bucket](<#/doc/container/unordered_set/bucket>) | retorna o bucket para uma chave específica
(função membro pública)

##### Política de Hash

[ load_factor](<#/doc/container/unordered_set/load_factor>) | retorna o número médio de elementos por bucket
(função membro pública)
[ max_load_factor](<#/doc/container/unordered_set/max_load_factor>) | gerencia o número médio máximo de elementos por bucket
(função membro pública)
[ rehash](<#/doc/container/unordered_set/rehash>) | reserva pelo menos o número especificado de buckets e regenera a tabela hash
(função membro pública)
[ reserve](<#/doc/container/unordered_set/reserve>) | reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash
(função membro pública)

##### Observadores

[ hash_function](<#/doc/container/unordered_set/hash_function>) | retorna a função usada para fazer hash das chaves
(função membro pública)
[ key_eq](<#/doc/container/unordered_set/key_eq>) | retorna a função usada para comparar chaves por igualdade
(função membro pública)

### Funções não-membro

[ operator==/operator!=](<#/doc/container/unordered_set/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_set
(modelo de função)
[ std::swap(std::unordered_set)](<#/doc/container/unordered_set/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_set)](<#/doc/container/unordered_set/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/unordered_set/deduction_guides>)

| (desde C++17)

### Notas

Os tipos de membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [Regra de Uma Definição](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <unordered_set>
     
    void print(const auto& set)
    {
        for (const auto& elem : set)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::unordered_set<int> mySet{2, 7, 1, 8, 2, 8}; // creates a set of ints
        print(mySet);
     
        mySet.insert(5); // puts an element 5 in the set
        print(mySet);
     
        if (auto iter = mySet.find(5); iter != mySet.end())
            mySet.erase(iter); // removes an element pointed to by iter
        print(mySet);
     
        mySet.erase(7); // removes an element 7
        print(mySet);
    }
```

Saída possível:
```
    8 1 7 2
    5 8 1 7 2
    8 1 7 2
    8 1 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2050](<https://cplusplus.github.io/LWG/issue2050>) | C++11 | as definições de `reference`, `const_reference`, `pointer`
e `const_pointer` eram baseadas em `allocator_type` | baseadas em `value_type` e
[std::allocator_traits](<#/doc/memory/allocator_traits>)

### Veja também

[ unordered_multiset](<#/doc/container/unordered_multiset>)(C++11) | coleção de chaves, com hash pelas chaves
(modelo de classe)
[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas pelas chaves
(modelo de classe)
[ flat_set](<#/doc/container/flat_set>)(C++23) | adapta um container para fornecer uma coleção de chaves únicas, ordenadas pelas chaves
(modelo de classe)