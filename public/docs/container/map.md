# std::map

Definido no cabeçalho `[<map>](<#/doc/header/map>)`

```c
template<
class Key,
class T,
class Compare = std::less<Key>,
class Allocator = std::allocator<std::pair<const Key, T>>
> class map;
namespace pmr {
template<
class Key,
class T,
class Compare = std::less<Key>
> using map = std::map<Key, T, Compare,
std::pmr::polymorphic_allocator<std::pair<const Key, T>>>;
}
```

`std::map` é um container associativo ordenado que contém pares chave-valor com chaves únicas. As chaves são ordenadas usando a função de comparação `Compare`. As operações de busca, remoção e inserção têm complexidade logarítmica. Maps são geralmente implementados como [árvores Rubro-Negras](<https://en.wikipedia.org/wiki/Red%E2%80%93black_tree> "enwiki:Red–black tree").

Iteradores de `std::map` iteram em ordem crescente das chaves, onde crescente é definido pela comparação que foi usada para a construção. Ou seja, dado

* m, um `std::map`
* it_l e it_r, iteradores desreferenciáveis para m, com it_l < it_r.

m.value_comp()(*it_l, *it_r) == true (do menor para o maior se usando a comparação padrão).

Em todos os lugares onde a standard library usa os requisitos [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Em termos imprecisos, dois objetos a e b são considerados equivalentes (não únicos) se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::map` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membro

```cpp
Tipo | Definição
`key_type` | `Key`
`mapped_type` | `T`
`value_type` | std::pair<const Key, T>
`size_type` | Tipo inteiro sem sinal (geralmente std::size_t)
`difference_type` | Tipo inteiro com sinal (geralmente std::ptrdiff_t)
`key_compare` | `Compare`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer`  // (até C++11)
std::allocator_traits<Allocator>::pointer  // (desde C++11)
`const_pointer` | | `Allocator::const_pointer`  // (até C++11)
std::allocator_traits<Allocator>::const_pointer  // (desde C++11)
`iterator` | LegacyBidirectionalIterator para `value_type`
`const_iterator` | LegacyBidirectionalIterator para const value_type
`reverse_iterator` | std::reverse_iterator<iterator>
`const_reverse_iterator` | std::reverse_iterator<const_iterator>
`node_type` (desde C++17) | uma especialização de node handle representando um nó de container
`insert_return_type` (desde C++17) | tipo que descreve o resultado da inserção de um `node_type`, uma especialização de
template<class Iter, class NodeType>
struct /*unspecified*/
{
Iter position;
bool inserted;
NodeType node;
};
instanciado com os argumentos de template `iterator` e `node_type`.
```

### Classes de membro

[ value_compare](<#/doc/container/map/value_compare>) | compara objetos do tipo `value_type`
(classe)

### Funções de membro

[ (construtor)](<#/doc/container/map/map>) | constrói o `map`
(função membro pública)
[ (destrutor)](<#/doc/container/map/~map>) | destrói o `map`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/map/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/container/map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/map/operator_at>) | acessa ou insere o elemento especificado
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/map/begin>)(C++11) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/container/map/end>)(C++11) | retorna um iterador para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/map/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/map/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/map/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/map/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/map/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/map/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/map/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/map/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ insert_or_assign](<#/doc/container/map/insert_or_assign>)(C++17) | insere um elemento ou atribui ao elemento atual se a chave já existe
(função membro pública)
[ emplace](<#/doc/container/map/emplace>)(C++11) | constrói o elemento no local (in-place)
(função membro pública)
[ emplace_hint](<#/doc/container/map/emplace_hint>)(C++11) | constrói elementos no local (in-place) usando uma dica
(função membro pública)
[ try_emplace](<#/doc/container/map/try_emplace>)(C++17) | insere no local (in-place) se a chave não existe, não faz nada se a chave existe
(função membro pública)
[ erase](<#/doc/container/map/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/map/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/map/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/map/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/map/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/map/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/map/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)
[ lower_bound](<#/doc/container/map/lower_bound>) | retorna um iterador para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/map/upper_bound>) | retorna um iterador para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/map/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/map/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/map/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `map`s
(template de função)
[ std::swap(std::map)](<#/doc/container/map/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase_if(std::map)](<#/doc/container/map/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### [Guias de dedução](<#/doc/container/map/deduction_guides>)

| (desde C++17)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <string>
    #include <string_view>
    
    void print_map(std::string_view comment, const std::map<std::string, int>& m)
    {
        std::cout << comment;
        // Iterate using C++17 facilities
        for (const auto& [key, value] : m)
            std::cout << '[' << key << "] = " << value << "; ";
    
    // C++11 alternative:
    //  for (const auto& n : m)
    //      std::cout << n.first << " = " << n.second << "; ";
    //
    // C++98 alternative:
    //  for (std::map<std::string, int>::const_iterator it = m.begin(); it != m.end(); ++it)
    //      std::cout << it->first << " = " << it->second << "; ";
    
        std::cout << '\n';
    }
    
    int main()
    {
        // Create a map of three (string, int) pairs
        std::map<std::string, int> m{{"CPU", 10}, {"GPU", 15}, {"RAM", 20}};
    
        print_map("1) Initial map: ", m);
    
        m["CPU"] = 25; // update an existing value
        m["SSD"] = 30; // insert a new value
        print_map("2) Updated map: ", m);
    
        // Using operator[] with non-existent key always performs an insert
        std::cout << "3) m[UPS] = " << m["UPS"] << '\n';
        print_map("4) Updated map: ", m);
    
        m.erase("GPU");
        print_map("5) After erase: ", m);
    
        std::erase_if(m, { return pair.second > 25; });
        print_map("6) After erase: ", m);
        std::cout << "7) m.size() = " << m.size() << '\n';
    
        m.clear();
        std::cout << std::boolalpha << "8) Map is empty: " << m.empty() << '\n';
    }
```

Saída:
```
    1) Initial map: [CPU] = 10; [GPU] = 15; [RAM] = 20;
    2) Updated map: [CPU] = 25; [GPU] = 15; [RAM] = 20; [SSD] = 30;
    3) m[UPS] = 0
    4) Updated map: [CPU] = 25; [GPU] = 15; [RAM] = 20; [SSD] = 30; [UPS] = 0;
    5) After erase: [CPU] = 25; [RAM] = 20; [SSD] = 30; [UPS] = 0;
    6) After erase: [CPU] = 25; [RAM] = 20; [UPS] = 0;
    7) m.size() = 3
    8) Map is empty: true
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `Key` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) (uma chave do tipo `Key` poderia não ser capaz de ser construída) | `Key` também é exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
[LWG 464](<https://cplusplus.github.io/LWG/issue464>) | C++98 | acessar um `map` `const` por chave era inconveniente | função `at` fornecida

### Veja também

[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(template de classe)
[ unordered_map](<#/doc/container/unordered_map>)(C++11) | coleção de pares chave-valor, hashed por chaves, chaves são únicas
(template de classe)
[ flat_map](<#/doc/container/flat_map>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves únicas
(template de classe)