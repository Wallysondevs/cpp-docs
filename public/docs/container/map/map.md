# std::map&lt;Key,T,Compare,Allocator&gt;::map

```cpp
  // (1)
map();  // (até C++11)
map()
: map(Compare()) {}  // (desde C++11)
explicit map( const Compare& comp,
const Allocator& alloc = Allocator() );  // (2)
explicit map( const Allocator& alloc );  // (3) (desde C++11)
template< class InputIt >
map( InputIt first, InputIt last,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (4)
template< class InputIt >
map( InputIt first, InputIt last,
const Allocator& alloc )
: map(first, last, Compare(), alloc) {}  // (5) (desde C++14)
map( const map& other );  // (6)
map( const map& other, const Allocator& alloc );  // (7) (desde C++11)
map( map&& other );  // (8) (desde C++11)
map( map&& other, const Allocator& alloc );  // (9) (desde C++11)
map( std::initializer_list<value_type> init,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (10) (desde C++11)
map( std::initializer_list<value_type> init,
const Allocator& alloc )
: map(init, Compare(), alloc) {}  // (11) (desde C++14)
template< container-compatible-range<value_type> R >
map( std::from_range_t, R&& rg,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (12) (desde C++23)
template< container-compatible-range<value_type> R >
map( std::from_range_t, R&& rg,
const Allocator& alloc )
: map(std::from_range, std::forward<R>(rg), Compare(), alloc) {}  // (13) (desde C++23)
```

  
Constrói um novo container a partir de uma variedade de fontes de dados e, opcionalmente, usando o alocador fornecido pelo usuário alloc ou o objeto de função de comparação comp.

1-3) Constrói um container vazio.

4,5) Constrói o container com o conteúdo do range `[`first`, `last`)`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

6,7) [Construtor de cópia](<#/doc/language/copy_constructor>). Constrói o container com a cópia do conteúdo de other. Se alloc não for fornecido, o alocador é obtido chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::  
select_on_container_copy_construction(other.get_allocator()).  | (desde C++11)  
---|---
Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
8,9) [Construtor de movimento](<#/doc/language/move_constructor>). Constrói o container com o conteúdo de other usando move semantics. Se alloc não for fornecido, o alocador é obtido por construção de movimento a partir do alocador pertencente a other. Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
10,11) [Construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container com o conteúdo da lista de inicialização init. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

12,13) Constrói o container com o conteúdo de rg. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
comp  |  \-  |  objeto de função de comparação a ser usado para todas as comparações de chaves   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  lista de inicialização para inicializar os elementos do container   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/map>)  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).   
-`Allocator` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Complexidade

1-3) Constante.

4,5) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [std::distance](<#/doc/iterator/distance>)(first, last) em geral, linear em \\(\scriptsize N\\)N se `[`first`, `last`)` já estiver ordenado por value_comp().

6,7) Linear no tamanho de other.

8,9) Constante. Se alloc for fornecido e alloc != other.get_allocator(), então linear.

10,11) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é init.size() em geral, linear em \\(\scriptsize N\\)N se init já estiver ordenado por value_comp().

12,13) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg) em geral, linear em \\(\scriptsize N\\)N se rg já estiver ordenado por value_comp().

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções.

### Notas

Após a construção de movimento do container (sobrecarga (8,9)), referências, ponteiros e iteradores (exceto o iterador final) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

Embora não formalmente exigido até C++23, algumas implementações já colocaram o parâmetro template `Allocator` em [contextos não deduzidos](<#/doc/language/template_argument_deduction>) em modos anteriores.

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecargas ([12,13](<#/doc/container/map/map>))  
  
### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <string>
    
    template<typename Key, typename Value, typename Cmp>
    std::ostream& operator<<(std::ostream& os, std::map<Key, Value, Cmp> const& map)
    {
        os << "{ ";
        for (auto comma{map.size()}; auto const& p : map)
            os << '\'' << p.first << "' is " << p.second << (--comma ? ", " : " ");
        return os << "}\n";
    }
    
    struct Point
    {
        double x, y;
    
        friend std::ostream& operator<<(std::ostream& os, Point pt)
        {
            return os << '(' << pt.x << ", " << pt.y << ')';
        }
    };
    
    struct PointCmp
    {
        bool operator()(const Point& lhs, const Point& rhs) const
        {
            return lhs.x < rhs.x; // NB: y is intentionally ignored
        }
    };
    
    int main()
    {
        // (1) Default constructor
        std::map<std::string, int> map1;
        map1["something"] = 69;
        map1["anything"] = 199;
        map1["that thing"] = 50;
        std::cout << "map1 = " << map1;
    
        // (4) Range constructor
        std::map<std::string, int> iter(map1.find("anything"), map1.end());
        std::cout << "\niter = " << iter;
        std::cout << "map1 = " << map1;
    
        // (6) Copy constructor
        std::map<std::string, int> copied(map1);
        std::cout << "\ncopied = " << copied;
        std::cout << "map1 = " << map1;
    
        // (8) Move constructor
        std::map<std::string, int> moved{std::move(map1)};
        std::cout << "\nmoved = " << moved;
        std::cout << "map1 = " << map1;
    
        // (10) Initializer list constructor
        const std::map<std::string, int> init
        {
            {"this", 100},
            {"can", 100},
            {"be", 100},
            {"const", 100}
        };
        std::cout << "\ninit = " << init;
    
        std::cout << "\nCustom Key class option 1:\n";
        // Use a comparison struct
        std::map<Point, double, PointCmp> mag =
        {
            {{5, -12}, 13},
            {{3, 4}, 5},
            {{-8, -15}, 17}
        };
        std::cout << "mag = " << mag << '\n';
    
        std::cout << "Custom Key class option 2:\n";
        // Use a comparison lambda
        // This lambda sorts points according to their magnitudes, where
        // these magnitudes are taken from the local variable mag.
        auto cmpLambda = &mag
        {
            return mag[lhs] < mag[rhs];
        };
    
        // You could also use a lambda that is not dependent on local variables, like this:
        // auto cmpLambda = { return lhs.y < rhs.y; };
        std::map<Point, double, decltype(cmpLambda)> magy(cmpLambda);
    
        // Various ways of inserting elements:
        magy.insert(std::pair<Point, double>({5, -12}, 13));
        magy.insert({{3, 4}, 5});
        magy.insert({Point{-8.0, -15.0}, 17});    
        std::cout << "magy = " << magy << '\n';
    
        std::cout << "Construction from a range:\n";
        using PS = std::pair<const std::string, int>;
        const auto rg = {PS{"one", 1}, {"one", 101}, {"two", 2}, {"three", 3}};
    #if __cpp_lib_containers_ranges
        std::map<std::string, int> nums(std::from_range, rg); // overload (12)
    #else
        std::map<std::string, int> nums(rg.begin(), rg.end()); // fallback to (4)
    #endif
        std::cout << "nums = " << nums << '\n';
    }
```

Saída:
```
    map1 = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    
    iter = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    map1 = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    
    copied = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    map1 = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    
    moved = { 'anything' is 199, 'something' is 69, 'that thing' is 50 }
    map1 = { }
    
    init = { 'be' is 100, 'can' is 100, 'const' is 100, 'this' is 100 }
    
    Custom Key class option 1:
    mag = { '(-8, -15)' is 17, '(3, 4)' is 5, '(5, -12)' is 13 }
    
    Custom Key class option 2:
    magy = { '(3, 4)' is 5, '(5, -12)' is 13, '(-8, -15)' is 17 }
    
    Construction from a range:
    nums = { 'one' is 1, 'three' is 3, 'two' is 2 }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2076](<https://cplusplus.github.io/LWG/issue2076>) | C++11  | a sobrecarga (4) exigia condicionalmente que `Key` e `T` fossem [CopyInsertable](<#/doc/named_req/CopyInsertable>) em *this | não exigido   
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era explícito  | tornado não explícito   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)  