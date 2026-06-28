# std::set

Definido no cabeçalho `[<set>](<#/doc/header/set>)`

```c
template<
class Key,
class Compare = std::less<Key>,
class Allocator = std::allocator<Key>
> class set;
namespace pmr {
template<
class Key,
class Compare = std::less<Key>
> using set = std::set<Key, Compare, std::pmr::polymorphic_allocator<Key>>;
}
```

`std::set` é um container associativo que contém um conjunto ordenado de objetos únicos do tipo `Key`. A ordenação é feita usando a função de comparação de chaves [Compare](<#/doc/named_req/Compare>). Operações de busca, remoção e inserção têm complexidade logarítmica. Sets são geralmente implementados como [árvores Rubro-negras](<https://en.wikipedia.org/wiki/Red%E2%80%93black_tree> "enwiki:Red–black tree").

Onde quer que a biblioteca padrão utilize os requisitos [Compare](<#/doc/named_req/Compare>), a unicidade é determinada usando a relação de equivalência. Em termos imprecisos, dois objetos a e b são considerados equivalentes se nenhum deles for menor que o outro: !comp(a, b) && !comp(b, a).

`std::set` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [AssociativeContainer](<#/doc/named_req/AssociativeContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Parâmetros de template

| Esta seção está incompleta
Razão: Adicionar descrições dos parâmetros de template.

### Tipos de membro

```cpp
Tipo | Definição
`key_type` | `Key`
`value_type` | `Key`
`size_type` | Tipo inteiro sem sinal (geralmente std::size_t)
`difference_type` | Tipo inteiro com sinal (geralmente std::ptrdiff_t)
`key_compare` | `Compare`
`value_compare` | `Compare`
`allocator_type` | `Allocator`
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer`  // (até C++11)
std::allocator_traits<Allocator>::pointer  // (desde C++11)
`const_pointer` | | `Allocator::const_pointer`  // (até C++11)
std::allocator_traits<Allocator>::const_pointer  // (desde C++11)
`iterator` | LegacyBidirectionalIterator constante para `value_type`
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

### Funções membro

[ (construtor)](<#/doc/container/set/set>) | constrói o `set`
(função membro pública)
[ (destrutor)](<#/doc/container/set/~set>) | destrói o `set`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/set/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begin/cbegin](<#/doc/container/set/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ end/cend](<#/doc/container/set/end>)(C++11) | retorna um iterator para o fim
(função membro pública)
[ rbegin/crbegin](<#/doc/container/set/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rend/crend](<#/doc/container/set/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/set/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/set/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/set/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/set/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/set/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ insert_range](<#/doc/container/set/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/set/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/set/emplace_hint>)(C++11) | constrói elementos no local usando uma dica
(função membro pública)
[ erase](<#/doc/container/set/erase>) | apaga elementos
(função membro pública)
[ swap](<#/doc/container/set/swap>) | troca o conteúdo
(função membro pública)
[ extract](<#/doc/container/set/extract>)(C++17) | extrai nós do container
(função membro pública)
[ merge](<#/doc/container/set/merge>)(C++17) | une nós de outro container
(função membro pública)

##### Busca

[ count](<#/doc/container/set/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ find](<#/doc/container/set/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/set/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)
[ lower_bound](<#/doc/container/set/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ upper_bound](<#/doc/container/set/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)

##### Observadores

[ key_comp](<#/doc/container/set/key_comp>) | retorna a função que compara chaves
(função membro pública)
[ value_comp](<#/doc/container/set/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/set/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `set`s
(template de função)
[ std::swap(std::set)](<#/doc/container/set/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase_if(std::set)](<#/doc/container/set/erase_if>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### [Guias de dedução](<#/doc/container/set/deduction_guides>)

| (desde C++17)

### Notas

Os tipos de membro `iterator` e `const_iterator` podem ser aliases para o mesmo tipo. Isso significa que definir um par de sobrecargas de função usando os dois tipos como tipos de parâmetro pode violar a [One Definition Rule](<#/doc/language/definition>). Como `iterator` é conversível para `const_iterator`, uma única função com um `const_iterator` como tipo de parâmetro funcionará em vez disso.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <set>
    #include <string_view>
    
    template<typename T>
    std::ostream& operator<<(std::ostream& out, const std::set<T>& set)
    {
        if (set.empty())
            return out << "{}";
        out << "{ " << *set.begin();
        std::for_each(std::next(set.begin()), set.end(), &out
        {
            out << ", " << element;
        });
        return out << " }";
    }
    
    int main()
    {
        std::set<int> set{1, 5, 3};
        std::cout << set << '\n';
    
        set.insert(2);
        std::cout << set << '\n';
    
        set.erase(1);
        std::cout << set << "\n\n";
    
        std::set<int> keys{3, 4};
        for (int key : keys)
        {
            if (set.contains(key))
                std::cout << set << " does contain " << key << '\n';
            else
                std::cout << set << " doesn't contain " << key << '\n';
        }
        std::cout << '\n';
    
        std::string_view word = "element";
        std::set<char> characters(word.begin(), word.end());
        std::cout << "There are " << characters.size() << " unique characters in "
                  << std::quoted(word) << ":\n" << characters << '\n';
    }
```

Saída:
```
    { 1, 3, 5 }
    { 1, 2, 3, 5 }
    { 2, 3, 5 }
    
    { 2, 3, 5 } does contain 3
    { 2, 3, 5 } doesn't contain 4
    
    There are 5 unique characters in "element":
    { e, l, m, n, t }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 103](<https://cplusplus.github.io/LWG/issue103>) | C++98 | iterator permite modificação de chaves | iterator tornado constante
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `Key` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(uma chave do tipo `Key` pode não ser capaz de ser construída) | `Key` também é exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>)

### Ver também

[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenada por chaves
(template de classe)
[ unordered_set](<#/doc/container/unordered_set>)(C++11) | coleção de chaves únicas, hashadas por chaves
(template de classe)
[ flat_set](<#/doc/container/flat_set>)(C++23) | adapta um container para fornecer uma coleção de chaves únicas, ordenadas por chaves
(template de classe)