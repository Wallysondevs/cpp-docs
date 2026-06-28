# std::forward_list&lt;T,Allocator&gt;::forward_list

```cpp
forward_list() : forward_list(Allocator()) {}  // (1)
explicit forward_list( const Allocator& alloc );  // (2)
explicit forward_list( size_type count,
const Allocator& alloc = Allocator() );  // (3)
forward_list( size_type count, const T& value,
const Allocator& alloc = Allocator() );  // (4)
template< class InputIt >
forward_list( InputIt first, InputIt last,
const Allocator& alloc = Allocator() );  // (5)
template< container-compatible-range<T> R >
forward_list( std::from_range_t, R&& rg,
const Allocator& alloc = Allocator() );  // (6) (desde C++23)
forward_list( const forward_list& other );  // (7)
forward_list( forward_list&& other );  // (8)
  // (9)
forward_list( const forward_list& other, const Allocator& alloc );  // (até C++23)
forward_list( const forward_list& other,
const std::type_identity_t<Allocator>& alloc );  // (desde C++23)
  // (10)
forward_list( forward_list&& other, const Allocator& alloc );  // (até C++23)
forward_list( forward_list&& other,
const std::type_identity_t<Allocator>& alloc );  // (desde C++23)
forward_list( std::initializer_list<T> init,
const Allocator& alloc = Allocator() );  // (11)
```

  
Constrói uma nova `forward_list` a partir de uma variedade de fontes de dados, opcionalmente usando um alocador `alloc` fornecido pelo usuário.

1) O construtor padrão. Constrói uma `forward_list` vazia com um alocador construído por padrão.

Se `Allocator` não for [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), o comportamento é indefinido.

2) Constrói uma `forward_list` vazia com o alocador `alloc` fornecido.

3) Constrói uma `forward_list` com `count` objetos de `T` inseridos por padrão. Nenhuma cópia é feita.

Se `T` não for [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt;, o comportamento é indefinido.

4) Constrói uma `forward_list` com `count` cópias de elementos com o valor `value`.

Se `T` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt;, o comportamento é indefinido.

5) Constrói uma `forward_list` com o conteúdo do range `[`first`, `last`)`. Cada iterator em `[`first`, `last`)` é desreferenciado exatamente uma vez.

Esta sobrecarga participa da resolução de sobrecarga somente se `InputIt` satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

Se `T` não for [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt; a partir de *first, o comportamento é indefinido.

6) Constrói uma `forward_list` com o conteúdo do range `rg`. Cada iterator em `rg` é desreferenciado exatamente uma vez.

Se `T` não for [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt; a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg), o comportamento é indefinido.

7-10) Constrói uma `forward_list` com o conteúdo de `other`.

7) O construtor de cópia. O alocador é obtido como se chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::  
select_on_container_copy_construction  
(other.get_allocator()).

8) O construtor de movimento. O alocador é obtido por construção de movimento a partir de other.get_allocator().

9) O mesmo que o construtor de cópia, exceto que `alloc` é usado como alocador.

Se `T` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt;, o comportamento é indefinido.

10) O mesmo que o construtor de movimento, exceto que `alloc` é usado como alocador.

Se `T` não for [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::forward_list](<#/doc/container/forward_list>)&lt;T&gt;, o comportamento é indefinido.

11) Equivalente a forward_list(il.begin(), il.end(), alloc).

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
count  |  \-  |  o tamanho do container   
value  |  \-  |  o valor para inicializar os elementos do container   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  initializer list para inicializar os elementos do container   
rg  |  \-  |  um range compatível com container   
  
### Complexidade

1,2) Constante.

3,4) Linear em `count`.

5) Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

6) Linear em [ranges::distance](<#/doc/iterator/ranges/distance>)(rg).

7) Linear em other.size().

8) Constante.

9) Linear em other.size().

10) Linear em other.size() se alloc != other.get_allocator(), caso contrário, constante.

11) Linear em init.size().

### Exceções

Chamadas para Allocator::allocate podem lançar exceções.

### Notas

Após a construção de movimento do container (sobrecarga (8)), referências, ponteiros e iterators (exceto o iterator `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de Ranges; sobrecarga (6)  
  
### Exemplo

Run this code
```
    #include <forward_list>
    #include <iostream>
    #include <string>
     
    template<typename T>
    std::ostream& operator<<(std::ostream& s, const std::forward_list<T>& v)
    {
        s.put('{');
        for (char comma[]{'\0', ' ', '\0'}; const auto& e : v)
            s << comma << e, comma[0] = ',';
        return s << "}\n";
    }
     
    int main()
    {
        // C++11 initializer list syntax:
        std::forward_list<std::string> words1{"the", "frogurt", "is", "also", "cursed"};
        std::cout << "1: " << words1;
     
        // words2 == words1
        std::forward_list<std::string> words2(words1.begin(), words1.end());
        std::cout << "2: " << words2;
     
        // words3 == words1
        std::forward_list<std::string> words3(words1);
        std::cout << "3: " << words3;
     
        // words4 is {"Mo", "Mo", "Mo", "Mo", "Mo"}
        std::forward_list<std::string> words4(5, "Mo");
        std::cout << "4: " << words4;
     
        const auto rg = {"cat", "cow", "crow"};
    #ifdef __cpp_lib_containers_ranges
        std::forward_list<std::string> words5(std::from_range, rg); // overload (6)
    #else
        std::forward_list<std::string> words5(rg.begin(), rg.end()); // overload (5)
    #endif
        std::cout << "5: " << words5;
    }
```

Output: 
```
    1: {the, frogurt, is, also, cursed}
    2: {the, frogurt, is, also, cursed}
    3: {the, frogurt, is, also, cursed}
    4: {Mo, Mo, Mo, Mo, Mo}
    5: {cat, cow, crow}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era explícito  | tornou-se não explícito   
[LWG 2210](<https://cplusplus.github.io/LWG/issue2210>) | C++11  | a sobrecarga (3) não tinha um parâmetro alocador  | o parâmetro foi adicionado   
[N3346](<https://wg21.link/N3346>) | C++11  | para a sobrecarga (3), os elementos no  
container eram inicializados por valor  | eles são inseridos por padrão   
  
### Veja também

[ assign](<#/doc/container/forward_list/assign>) |  atribui valores ao container   
(função membro pública)  
[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)