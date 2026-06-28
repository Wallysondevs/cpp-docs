# std::set&lt;Key,Compare,Allocator&gt;::set

```cpp
  // (1)
set();  // (até C++11)
set()
: set(Compare()) {}  // (desde C++11)
explicit set( const Compare& comp,
const Allocator& alloc = Allocator() );  // (2)
explicit set( const Allocator& alloc );  // (3) (desde C++11)
template< class InputIt >
set( InputIt first, InputIt last,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (4)
template< class InputIt >
set( InputIt first, InputIt last,
const Allocator& alloc )
: set(first, last, Compare(), alloc) {}  // (5) (desde C++14)
set( const set& other );  // (6)
set( const set& other, const Allocator& alloc );  // (7) (desde C++11)
set( set&& other );  // (8) (desde C++11)
set( set&& other, const Allocator& alloc );  // (9) (desde C++11)
set( std::initializer_list<value_type> init,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (10) (desde C++11)
set( std::initializer_list<value_type> init,
const Allocator& alloc )
: set(init, Compare(), alloc) {}  // (11) (desde C++14)
template< container-compatible-range<value_type> R >
set( std::from_range_t, R&& rg,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (12) (desde C++23)
template< container-compatible-range<value_type> R >
set( std::from_range_t, R&& rg,
const Allocator& alloc )
: set(std::from_range, std::forward<R>(rg), Compare(), alloc) {}  // (13) (desde C++23)
```

  
Constrói um novo container a partir de uma variedade de fontes de dados e, opcionalmente, usando o alocador fornecido pelo usuário `alloc` ou o objeto de função de comparação `comp`.

1-3) Constrói um container vazio.

4,5) Constrói o container com o conteúdo do range `[`first`, `last`)`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

6,7) [Construtor de cópia](<#/doc/language/copy_constructor>). Constrói o container com a cópia do conteúdo de `other`. Se `alloc` não for fornecido, o alocador é obtido chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::select_on_container_copy_construction(other.get_allocator()).  | (desde C++11)  
---|---
Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
8,9) [Construtor de movimento](<#/doc/language/move_constructor>). Constrói o container com o conteúdo de `other` usando move semantics. Se `alloc` não for fornecido, o alocador é obtido por construção de movimento a partir do alocador pertencente a `other`. Durante a [dedução de argumento de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
10,11) [Construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container com o conteúdo da lista de inicialização `init`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

12,13) Constrói o container com o conteúdo de `rg`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
comp  |  \-  |  objeto de função de comparação a ser usado para todas as comparações de chaves   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  lista de inicialização para inicializar os elementos do container   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/set>)  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).   
-`Allocator` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Complexidade

1-3) Constante.

4,5) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [std::distance](<#/doc/iterator/distance>)(first, last) em geral, linear em \\(\scriptsize N\\)N se `[`first`, `last`)` já estiver ordenado por value_comp().

6,7) Linear no tamanho de `other`.

8,9) Constante. Se `alloc` for fornecido e `alloc != other.get_allocator()`, então linear.

10,11) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é `init.size()` em geral, linear em \\(\scriptsize N\\)N se `init` já estiver ordenado por value_comp().

12,13) \\(\scriptsize N \cdot log(N)\\)N·log(N) onde \\(\scriptsize N\\)N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg) em geral, linear em \\(\scriptsize N\\)N se `rg` já estiver ordenado por value_comp().

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções.

### Notas

Após a construção por movimento do container (sobrecarga (8,9)), referências, ponteiros e iteradores (exceto o iterador de fim) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

Embora não formalmente exigido até C++23, algumas implementações já colocaram o parâmetro template `Allocator` em [contextos não deduzidos](<#/doc/language/template_argument_deduction>) em modos anteriores.

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecargas ([12,13](<#/doc/container/set/set>))  
  
### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <set>
    #include <string>
    
    struct Point { double x, y; };
    
    struct PointCmp
    {
        bool operator()(const Point& lhs, const Point& rhs) const
        {
            return std::hypot(lhs.x, lhs.y) < std::hypot(rhs.x, rhs.y);
        }
    };
    
    std::ostream& operator<<(std::ostream& os, Point pt)
    {
        return os << '(' << pt.x << ',' << pt.x << ')';
    }
    
    void println(auto rem, const auto& seq)
    {
        std::cout << rem << '{';
        for (auto n{seq.size()}; const auto& elm : seq)
            std::cout << elm << (--n ? ", " : "");
        std::cout << "}\n";
    }
    
    int main()
    {
        // (1) Default constructor
        std::set<std::string> a;
        a.insert("horse");
        a.insert("cat");
        a.insert("dog");
        println("1) a: ", a);
    
        // (4) Range constructor
        std::set<std::string> b(a.find("dog"), a.end());
        println("2) b: ", b);
    
        // (6) Copy constructor
        std::set<std::string> c(a);
        c.insert("another horse");
        println("3) c: ", c);
    
        // (8) Move constructor
        std::set<std::string> d(std::move(a));
        println("4) d: ", d);
        println("5) a: ", a);
    
        // (10) Initializer list constructor
        std::set<std::string> e{"one", "two", "three", "five", "eight"};
        println("6) e: ", e);
    
        // Custom comparison
        std::set<Point, PointCmp> f = {{2, 5}, {3, 4}, {1, 1}};
        f.insert({1, -1}); // This fails because the magnitude of (1,-1) equals (1,1)
        println("7) f: ", f);
    
        // (12) Range constructor
        const auto w = {"Eurybia", "Theia", "Rhea", "Aura", "Mnemosyne", "Mnemosyne"};
    #if __cpp_lib_containers_ranges
        std::set<std::string> g(std::from_range, w); // overload (12)
    #else
        std::set<std::string> g(w.begin(), w.end()); // fallback to (4)
    #endif
        println("8) g: ", g);
    }
```

Saída possível:
```
    1) a: {cat, dog, horse}
    2) b: {dog, horse}
    3) c: {another horse, cat, dog, horse}
    4) d: {cat, dog, horse}
    5) a: {}
    6) e: {eight, five, one, three, two}
    7) f: {(1,1), (3,3), (2,2)}
    8) g: {Aura, Eurybia, Mnemosyne, Rhea, Theia}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2076](<https://cplusplus.github.io/LWG/issue2076>) | C++11  | a sobrecarga (4) exigia condicionalmente que `Key` fosse [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `*this` | não exigido   
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era explícito  | tornado não explícito   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)  