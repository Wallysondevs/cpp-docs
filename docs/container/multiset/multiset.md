# std::multiset&lt;Key,Compare,Allocator&gt;::multiset

```cpp
  // (1)
multiset();  // (até C++11)
multiset()
: multiset(Compare()) {}  // (desde C++11)
explicit multiset( const Compare& comp,
const Allocator& alloc = Allocator() );  // (2)
explicit multiset( const Allocator& alloc );  // (3) (desde C++11)
template< class InputIt >
multiset( InputIt first, InputIt last,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (4)
template< class InputIt >
multiset( InputIt first, InputIt last,
const Allocator& alloc )
: multiset(first, last, Compare(), alloc) {}  // (5) (desde C++14)
multiset( const multiset& other );  // (6)
multiset( const multiset& other, const Allocator& alloc );  // (7) (desde C++11)
multiset( multiset&& other );  // (8) (desde C++11)
multiset( multiset&& other, const Allocator& alloc );  // (9) (desde C++11)
multiset( std::initializer_list<value_type> init,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (10) (desde C++11)
multiset( std::initializer_list<value_type> init,
const Allocator& alloc )
: multiset(init, Compare(), alloc) {}  // (11) (desde C++14)
template< container-compatible-range<value_type> R >
multiset( std::from_range_t, R&& rg,
const Compare& comp = Compare(),
const Allocator& alloc = Allocator() );  // (12) (desde C++23)
template< container-compatible-range<value_type> R >
multiset( std::from_range_t, R&& rg,
const Allocator& alloc )
: multiset(std::from_range, std::forward<R>(rg), Compare(), alloc) {}  // (13) (desde C++23)
```

  
Constrói um novo container a partir de uma variedade de fontes de dados e, opcionalmente, usando um alocador `alloc` fornecido pelo usuário ou um objeto de função de comparação `comp`.

1-3) Constrói um container vazio.

4,5) Constrói o container com o conteúdo do range `[`first`, `last`)`.

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

6,7) [Construtor de cópia](<#/doc/language/copy_constructor>). Constrói o container com a cópia do conteúdo de `other`. Se `alloc` não for fornecido, o alocador é obtido chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::select_on_container_copy_construction(other.get_allocator()).  | (desde C++11)  
---|---
Durante a [dedução de argumentos de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
8,9) [Construtor de movimento](<#/doc/language/move_constructor>). Constrói o container com o conteúdo de `other` usando move semantics. Se `alloc` não for fornecido, o alocador é obtido por construção de movimento a partir do alocador pertencente a `other`. Durante a [dedução de argumentos de template de classe](<#/doc/language/ctad>), apenas o primeiro argumento contribui para a dedução do parâmetro template `Allocator` do container.  | (desde C++23)  
  
10,11) [Construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container com o conteúdo da lista de inicialização `init`.

12,13) Constrói o container com o conteúdo de `rg`.

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
comp  |  \-  |  objeto de função de comparação a ser usado para todas as comparações de chaves   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  lista de inicialização para inicializar os elementos do container   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/multiset>)  
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

Após a construção de movimento do container (sobrecarga (8,9)), referências, ponteiros e iteradores (exceto o iterador `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

Embora não formalmente exigido até C++23, algumas implementações já colocaram o parâmetro template `Allocator` em [contextos não deduzidos](<#/doc/language/template_argument_deduction>) em modos anteriores.

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>); sobrecargas ([12,13](<#/doc/container/multiset/multiset>))  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <set>
    #include <string_view>
     
    template <typename T>
    void println(const std::string_view name, const std::multiset<T>& ms)
    {
        std::cout << name << ": ";
        for (const auto& element : ms)
            std::cout << element << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        // (1) Construtor padrão
        std::multiset<int> a;
        a.insert(4);
        a.insert(3);
        a.insert(2);
        a.insert(1);
        println("a", a);
     
        // (4) Construtor de range
        std::multiset<int> b(a.begin(), a.find(3));
        println("b", b);
     
        // (6) Construtor de cópia
        std::multiset<int> c(a);
        println("c", c);
     
        // (8) Construtor de movimento
        std::multiset<int> d(std::move(a));
        println("d", d);
     
        // (10) Construtor de lista de inicialização
        std::multiset<int> e{3, 2, 1, 2, 4, 7, 3};
        println("e", e);
     
        // (12) Construtor de range
        const auto w = {"α", "β", "γ", "δ", "δ", "γ", "β", "α"};
    #if __cpp_lib_containers_ranges
        std::multiset<std::string> f(std::from_range, w); // sobrecarga (12)
    #else
        std::multiset<std::string> f(w.begin(), w.end()); // fallback para (4)
    #endif
        println("f", f);
    }
```

Saída:
```
    a: 1 2 3 4
    b: 1 2
    c: 1 2 3 4
    d: 1 2 3 4
    e: 1 2 2 3 3 4 7
    f: α α β β γ γ δ δ
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2076](<https://cplusplus.github.io/LWG/issue2076>) | C++11  | a sobrecarga (4) exigia condicionalmente que `Key` fosse [CopyInsertable](<#/doc/named_req/CopyInsertable>) em `*this` | não exigido   
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era `explicit`  | tornado não-`explicit`   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)  