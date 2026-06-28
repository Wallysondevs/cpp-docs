# std::unordered_map

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
template<
class Key,
class T,
class Hash = std::hash<Key>,
class KeyEqual = std::equal_to<Key>,
class Allocator = std::allocator<std::pair<const Key, T>>
> class unordered_map;
namespace pmr {
template<
class Key,
class T,
class Hash = std::hash<Key>,
class KeyEqual = std::equal_to<Key>
> using unordered_map =
std::unordered_map<Key, T, Hash, KeyEqual,
std::pmr::polymorphic_allocator<std::pair<const Key, T>>>;
}
```

`std::unordered_map` é um container associativo que contém pares chave-valor com chaves únicas. A busca, inserção e remoção de elementos possuem complexidade de tempo constante em média.

Internamente, os elementos não são ordenados em nenhuma ordem particular, mas organizados em buckets. O bucket em que um elemento é colocado depende inteiramente do hash de sua chave. Chaves com o mesmo código hash aparecem no mesmo bucket. Isso permite acesso rápido a elementos individuais, pois uma vez que o hash é computado, ele se refere ao bucket exato onde o elemento é colocado.

Duas chaves são consideradas _equivalentes_ se o predicado de igualdade de chaves do map retornar true quando essas chaves forem passadas. Se duas chaves são equivalentes, a função hash deve retornar o mesmo valor para ambas as chaves.

`std::unordered_map` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>).

### Invalidação de Iterator

Operações | Invalidado
---|---
Todas as operações somente leitura, [swap](<#/doc/container/unordered_map/swap>), [std::swap](<#/doc/utility/swap>) | Nunca
[clear](<#/doc/container/unordered_map/clear>), [rehash](<#/doc/container/unordered_map/rehash>), [reserve](<#/doc/container/unordered_map/reserve>), [operator=](<#/>) | Sempre
[insert](<#/doc/container/unordered_map/insert>), [emplace](<#/doc/container/unordered_map/emplace>), [emplace_hint](<#/doc/container/unordered_map/emplace_hint>), [operator[]](<#/doc/container/unordered_map/operator_at>) | Apenas se causar rehash
[erase](<#/doc/container/unordered_map/erase>) | Apenas para o elemento apagado

#### Notas

*   As funções swap não invalidam nenhum dos iterators dentro do container, mas invalidam o iterator que marca o fim da região de swap.

*   Referências e ponteiros para a chave ou dados armazenados no container são invalidados apenas pela remoção desse elemento, mesmo quando o iterator correspondente é invalidado.

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membros

Tipo | Definição
---|---
`key_type` | `Key`
`mapped_type` | `T`
`value_type` | [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`hasher` | `Hash`
`key_equal` | `KeyEqual`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer
`const_pointer` | [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer
`iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para `value_type`
`const_iterator` | [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) para const value_type
`local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, tipos de ponteiro e referência são os mesmos que `iterator`. Este iterator pode ser usado para iterar através de um único bucket, mas não entre buckets.
`const_local_iterator` | Um tipo de iterator cuja categoria, valor, diferença, tipos de ponteiro e referência são os mesmos que `const_iterator`. Este iterator pode ser usado para iterar através de um único bucket, mas não entre buckets.
`node_type` (desde C++17) | uma especialização de [node handle](<#/doc/container/node_handle>) representando um nó de container
`insert_return_type` (desde C++17) | tipo que descreve o resultado da inserção de um `node_type`, uma especialização de
template&lt;class Iter, class NodeType&gt;
struct /*unspecified*/
{
Iter position;
bool inserted;
NodeType node;
};
instanciado com os argumentos de template `iterator` e `node_type`.

### Funções de membro

[ (construtor)](<#/doc/container/unordered_map/unordered_map>) | constrói o `unordered_map`
(função membro pública)
[ (destrutor)](<#/doc/container/unordered_map/~unordered_map>) | destrói o `unordered_map`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/unordered_map/get_allocator>) | retorna o allocator associado
(função membro pública)

##### Iterators

[ begincbegin](<#/doc/container/unordered_map/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/unordered_map/end>) | retorna um iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/unordered_map/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/unordered_map/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/unordered_map/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/unordered_map/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/unordered_map/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/unordered_map/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ insert_or_assign](<#/doc/container/unordered_map/insert_or_assign>)(C++17) | insere um elemento ou atribui ao elemento atual se a chave já existe
(função membro pública)
[ emplace](<#/doc/container/unordered_map/emplace>) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_map/emplace_hint>) | constrói elementos no local usando uma dica
(função membro pública)
[ try_emplace](<#/doc/container/unordered_map/try_emplace>)(C++17) | insere no local se a chave não existe, não faz nada se a chave existe
(função membro pública)
[ erase](<#/doc/container/unordered_map/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/unordered_map/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/unordered_map/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/unordered_map/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ at](<#/doc/container/unordered_map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/unordered_map/operator_at>) | acessa ou insere o elemento especificado
(função membro pública)
[ count](<#/doc/container/unordered_map/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/unordered_map/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_map/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)

##### Interface de Bucket

[ begin(size_type)cbegin(size_type)](<#/doc/container/unordered_map/begin2>) | retorna um iterator para o início do bucket especificado
(função membro pública)
[ end(size_type)cend(size_type)](<#/doc/container/unordered_map/end2>) | retorna um iterator para o fim do bucket especificado
(função membro pública)
[ bucket_count](<#/doc/container/unordered_map/bucket_count>) | retorna o número de buckets
(função membro pública)
[ max_bucket_count](<#/doc/container/unordered_map/max_bucket_count>) | retorna o número máximo de buckets
(função membro pública)
[ bucket_size](<#/doc/container/unordered_map/bucket_size>) | retorna o número de elementos no bucket específico
(função membro pública)
[ bucket](<#/doc/container/unordered_map/bucket>) | retorna o bucket para uma chave específica
(função membro pública)

##### Política de Hash

[ load_factor](<#/doc/container/unordered_map/load_factor>) | retorna o número médio de elementos por bucket
(função membro pública)
[ max_load_factor](<#/doc/container/unordered_map/max_load_factor>) | gerencia o número médio máximo de elementos por bucket
(função membro pública)
[ rehash](<#/doc/container/unordered_map/rehash>) | reserva pelo menos o número especificado de buckets e regenera a tabela hash
(função membro pública)
[ reserve](<#/doc/container/unordered_map/reserve>) | reserva espaço para pelo menos o número especificado de elementos e regenera a tabela hash
(função membro pública)

##### Observadores

[ hash_function](<#/doc/container/unordered_map/hash_function>) | retorna a função usada para fazer hash das chaves
(função membro pública)
[ key_eq](<#/doc/container/unordered_map/key_eq>) | retorna a função usada para comparar chaves por igualdade
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/container/unordered_map/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_map
(modelo de função)
[ std::swap(std::unordered_map)](<#/doc/container/unordered_map/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ erase_if(std::unordered_map)](<#/doc/container/unordered_map/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)

### [Guias de dedução](<#/doc/container/unordered_map/deduction_guides>)

| (desde C++17)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <unordered_map>
    
    int main()
    {
        // Cria um unordered_map de três strings (que mapeiam para strings)
        std::unordered_map<std::string, std::string> u =
        {
            {"RED", "#FF0000"},
            {"GREEN", "#00FF00"},
            {"BLUE", "#0000FF"}
        };
    
        // Função lambda auxiliar para imprimir pares chave-valor
        auto print_key_value = 
        {
            std::cout << "Key:[" << key << "] Value:[" << value << "]\n";
        };
    
        std::cout << "Itera e imprime pares chave-valor de unordered_map, sendo\n"
                     "explícito com seus tipos:\n";
        for (const std::pair<const std::string, std::string>& n : u)
            print_key_value(n.first, n.second);
    
        std::cout << "\nItera e imprime pares chave-valor usando structured binding do C++17:\n";
        for (const auto& [key, value] : u)
            print_key_value(key, value);
    
        // Adiciona duas novas entradas ao unordered_map
        u["BLACK"] = "#000000";
        u["WHITE"] = "#FFFFFF";
    
        std::cout << "\nSaída de valores por chave:\n"
                     "O HEX da cor RED é:[" << u["RED"] << "]\n"
                     "O HEX da cor BLACK é:[" << u["BLACK"] << "]\n\n";
    
        std::cout << "Usa operator[] com chave não existente para inserir um novo par chave-valor:\n";
        print_key_value("new_key", u["new_key"]);
    
        std::cout << "\nItera e imprime pares chave-valor, usando `auto`;\n"
                     "new_key é agora uma das chaves no map:\n";
        for (const auto& n : u)
            print_key_value(n.first, n.second);
    }
```

Saída possível:
```
    Itera e imprime pares chave-valor de unordered_map, sendo
    explícito com seus tipos:
    Key:[BLUE] Value:[#0000FF]
    Key:[GREEN] Value:[#00FF00]
    Key:[RED] Value:[#FF0000]
    
    Itera e imprime pares chave-valor usando structured binding do C++17:
    Key:[BLUE] Value:[#0000FF]
    Key:[GREEN] Value:[#00FF00]
    Key:[RED] Value:[#FF0000]
    
    Saída de valores por chave:
    O HEX da cor RED é:[#FF0000]
    O HEX da cor BLACK é:[#000000]
    
    Usa operator[] com chave não existente para inserir um novo par chave-valor:
    Key:[new_key] Value:[]
    
    Itera e imprime pares chave-valor, usando `auto`;
    new_key é agora uma das chaves no map:
    Key:[new_key] Value:[]
    Key:[WHITE] Value:[#FFFFFF]
    Key:[BLACK] Value:[#000000]
    Key:[BLUE] Value:[#0000FF]
    Key:[GREEN] Value:[#00FF00]
    Key:[RED] Value:[#FF0000]
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2050](<https://cplusplus.github.io/LWG/issue2050>) | C++11 | as definições de `reference`, `const_reference`, `pointer` e `const_pointer` eram baseadas em `allocator_type` | baseadas em `value_type` e [std::allocator_traits](<#/doc/memory/allocator_traits>)

### Veja também

[ unordered_multimap](<#/doc/container/unordered_multimap>)(C++11) | coleção de pares chave-valor, com hash pelas chaves
(modelo de classe)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(modelo de classe)
[ flat_map](<#/doc/container/flat_map>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves únicas
(modelo de classe)