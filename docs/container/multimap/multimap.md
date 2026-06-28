# std::multimap&lt;Key,T,Compare,Allocator&gt;::multimap

```cpp
  // (1)
multimap();  // (até C++11)
multimap()
: multimap(Compare()) {}  // (desde C++11)
explicit multimap( const Compare& comp,
const Allocator& alloc = Allocator() );  // (2)
explicit multimap( const Allocator& alloc );  // (3) (desde C++11)
template< class InputIt >
multimap( InputIt first, InputIt last,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (4)
template< class InputIt >
multimap( InputIt first, InputIt last,
const Allocator& alloc )
: multimap(first, last, Compare(), alloc) {}  // (5) (desde C++14)
multimap( const multimap& other );  // (6)
multimap( const multimap& other, const Allocator& alloc );  // (7) (desde C++11)
multimap( multimap&& other );  // (8) (desde C++11)
multimap( multimap&& other, const Allocator& alloc );  // (9) (desde C++11)
multimap( std::initializer_list<value_type> init,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (10) (desde C++11)
multimap( std::initializer_list<value_type> init,
const Allocator& alloc )
: multimap(init, Compare(), alloc) {}  // (11) (desde C++14)
template< container-compatible-range<value_type> R >
multimap( std::from_range_t, R&& rg,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (12) (desde C++23)
template< container-compatible-range<value_type> R >
multimap( std::from_range_t, R&& rg,
const Allocator& alloc )
: multimap(std::from_range, std::forward<R>(rg), Compare(), alloc) {}  // (13) (desde C++23)
```

  
Constrói um novo container a partir de uma variedade de fontes de dados e, opcionalmente, usando um alocador `alloc` fornecido pelo usuário ou um objeto de função de comparação `comp`.

1-3) Constrói um container vazio.

4,5) Constrói o container com o conteúdo do range `[`first`, `last`)`.

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

6,7) [Construtor de cópia](<#/doc/language/copy_constructor>). Constrói o container com a cópia do conteúdo de `other`. Se `alloc` não for fornecido, o alocador é obtido chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::  
select_on_container_copy_construction(other.get_allocator()).  | (desde C++11)  
---|---
Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
8,9) [Construtor de movimento](<#/doc/language/move_constructor>). Constrói o container com o conteúdo de `other` usando move semantics. Se `alloc` não for fornecido, o alocador é obtido por construção de movimento a partir do alocador pertencente a `other`. Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
10,11) [Construtor de lista de inicializadores](<#/doc/language/list_initialization>). Constrói o container com o conteúdo da lista de inicializadores `init`.

12,13) Constrói o container com o conteúdo de `rg`.

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
comp  |  \-  |  objeto de função de comparação a ser usado para todas as comparações de chaves   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  lista de inicializadores para inicializar os elementos do container   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/multimap>)  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).   
-`Allocator` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Complexidade

1-3) Constante.

4,5) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [std::distance](<#/doc/iterator/distance>)(first, last) em geral, linear em \\(\scriptsize N\\)N se `[`first`, `last`)` já estiver ordenado por value_comp().

6,7) Linear no tamanho de `other`.

8,9) Constante. Se `alloc` for fornecido e `alloc != other.get_allocator()`, então linear.

10,11) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é init.size() em geral, linear em \\(\scriptsize N\\)N se `init` já estiver ordenado por value_comp().

12,13) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg) em geral, linear em \\(\scriptsize N\\)N se `rg` já estiver ordenado por value_comp().

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções.

### Notas

Após a construção de movimento do container (sobrecarga (8,9)), referências, ponteiros e iterators (exceto o iterator `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sendo considerada via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

Embora não formalmente exigido até C++23, algumas implementações já colocaram o parâmetro template `Allocator` em [contextos não deduzidos](<#/doc/language/template_argument_deduction>) em modos anteriores.

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges; sobrecargas ([12,13](<#/doc/container/multimap/multimap>))  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <utility>
    
    struct Point { double x, y; };
    
    struct PointCmp
    {
        bool operator()(const Point& lhs, const Point& rhs) const
        {
            return lhs.x < rhs.x; // NB. ignores y on purpose
        }
    };
    
    template <typename Key, typename Value, typename Cmp>
    void println(auto rem, std::multimap<Key, Value, Cmp> const& map)
    {
        std::cout << rem << "{ ";
        for (auto n{map.size()}; auto const& p : map)
            std::cout << '[' << p.first << ":" << p.second << (--n ? "], " : "]");
        std::cout << " }\n";
    }
    
    int main()
    {
        std::multimap<int, int> m1 =
        {
            {1, 1}, {2, 2}, {3, 3}, {4, 4}, {4, 4}, {3, 3}, {2, 2}, {1, 1}
        };
        println("m1 = ", m1);
    
        // Custom comparison
        std::multimap<Point, double, PointCmp> mag
        {
            {{5, 12}, 13},
            {{3, 4}, 5},
            {{8, 15}, 17},
            {{3, -3}, -1}
        };
        for (auto p : mag)
            std::cout << "The magnitude of (" << p.first.x << ", " << p.first.y << ")"
                         " is " << p.second << '\n';
    
        std::cout << "Construction from a range:\n";
        using PS = std::pair<int, std::string>;
        const auto rg = {PS{3, "Earth"}, {2, "Venus"}, {1, "Mercury"}, {3, "Moon"}};
    #if __cpp_lib_containers_ranges
        std::multimap<int, std::string> m2(std::from_range, rg); // overload (12)
    #else
        std::multimap<int, std::string> m2(rg.begin(), rg.end()); // fallback to (4)
    #endif
        println("m2 = ", m2);
    }
```

Output:
```
    m1 = { [1:1], [1:1], [2:2], [2:2], [3:3], [3:3], [4:4], [4:4] }
    The magnitude of (3, 4) is 5
    The magnitude of (3, -3) is -1
    The magnitude of (5, 12) is 13
    The magnitude of (8, 15) is 17
    Construction from a range:
    m2 = { [1:Mercury], [2:Venus], [3:Earth], [3:Moon] }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2076](<https://cplusplus.github.io/LWG/issue2076>) | C++11  | a sobrecarga (4) exigia condicionalmente que `Key` e `T` fossem [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `*this` | não exigido   
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era explicit  | tornou-se não-explicit   
  
### Veja também

[ operator=](<#/>) | atribui valores ao container   
(função membro pública)  