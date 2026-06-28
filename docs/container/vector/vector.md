# std::vector&lt;T,Allocator&gt;::vector

```cpp
  // (1)
vector() : vector(Allocator()) {}  // (desde C++11)
(ate C++17)
vector() noexcept(noexcept(Allocator())) : vector(Allocator()) {}  // (desde C++17)
(constexpr desde C++20)
  // (2)
explicit vector( const Allocator& alloc = Allocator() ); |  |  (ate C++11)
explicit vector( const Allocator& alloc );  // (desde C++11)
(noexcept desde C++17)
(constexpr desde C++20)
explicit vector( size_type count,
const Allocator& alloc = Allocator() );  // (3) (desde C++11)
  // (4)
explicit vector( size_type count, const T& value = T(),
const Allocator& alloc = Allocator() ); |  |  (ate C++11)
vector( size_type count, const T& value,
const Allocator& alloc = Allocator() );  // (desde C++11)
(constexpr desde C++20)
template< class InputIt >
vector( InputIt first, InputIt last,
const Allocator& alloc = Allocator() ); |  (5) | (constexpr desde C++20)
template< container-compatible-range<T> R >
constexpr vector( std::from_range_t, R&& rg,
const Allocator& alloc = Allocator() );  // (6) (desde C++23)
vector( const vector& other ); |  (7) | (constexpr desde C++20)
vector( vector&& other );  // (8) (desde C++11)
(noexcept desde C++17)
(constexpr desde C++20)
  // (9)
vector( const vector& other, const Allocator& alloc );  // (desde C++11)
(constexpr desde C++20)
(ate C++23)
constexpr vector( const vector& other,
const std::type_identity_t<Allocator>& alloc );  // (desde C++23)
  // (10)
vector( vector&& other, const Allocator& alloc );  // (desde C++11)
(ate C++23)
constexpr vector( vector&& other,
const std::type_identity_t<Allocator>& alloc );  // (desde C++23)
vector( std::initializer_list<T> init,
const Allocator& alloc = Allocator() );  // (11) (desde C++11)
```

  
Constrói um novo `vector` a partir de uma variedade de fontes de dados, opcionalmente usando um alocador `alloc` fornecido pelo usuário.

1) O construtor padrão desde C++11. Constrói um `vector` vazio com um alocador construído por padrão.

Se `Allocator` não for [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), o comportamento é indefinido.

2) O construtor padrão até C++11. Constrói um `vector` vazio com o alocador `alloc` fornecido.

3) Constrói um `vector` com `count` objetos de `T` inseridos por padrão. Nenhuma cópia é feita.

Se `T` não for [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;, o comportamento é indefinido.

4) Constrói um `vector` com `count` cópias de elementos com o valor `value`. Se `T` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;, o comportamento é indefinido.  | (desde C++11)  
  
5) Constrói um `vector` com o conteúdo do range `[`first`, `last`)`. Cada iterator em `[`first`, `last`)` é desreferenciado exatamente uma vez. Se `InputIt` não satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>), a sobrecarga (4) é chamada em vez disso com os argumentos static_cast<size_type>(first), last e alloc.  | (ate C++11)  
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido: 

  * `T` não é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::vector](<#/doc/container/vector>)&lt;T&gt; a partir de *first. 
  * `Iter` não satisfaz os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), e `T` não é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;. 

| (desde C++11)  
  
6) Constrói um `vector` com o conteúdo do range `rg`. Cada iterator em `rg` é desreferenciado exatamente uma vez.

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido: 

  * `T` não é [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em [std::vector](<#/doc/container/vector>)&lt;T&gt; a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). 
  * `R` não modela nem [`sized_range`](<#/doc/ranges/sized_range>) nem [`forward_range`](<#/doc/ranges/forward_range>), e `T` não é [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;.

7-10) Constrói um `vector` com o conteúdo de `other`.

7) O construtor de cópia. O alocador é obtido como se chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::  
select_on_container_copy_construction  
(other.get_allocator()).  | (desde C++11)  
  
8) O construtor de movimento. O alocador é obtido por construção de movimento a partir de other.get_allocator().

9) O mesmo que o construtor de cópia, exceto que `alloc` é usado como o alocador.

Se `T` não for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;, o comportamento é indefinido.

10) O mesmo que o construtor de movimento, exceto que `alloc` é usado como o alocador.

Se `T` não for [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::vector](<#/doc/container/vector>)&lt;T&gt;, o comportamento é indefinido.

11) Equivalente a vector(il.begin(), il.end(), alloc).

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

5) Dado [std::distance](<#/doc/iterator/distance>)(first, last) como N: 

  * Se `first` e `last` forem ambos iterators forward, bidirecionais ou de acesso aleatório, 

    

  * O construtor de cópia de `T` é chamado apenas N vezes, e 
  * Nenhuma realocação ocorre. 

  * Caso contrário (`first` e `last` são apenas iterators de entrada), 

    

  * O construtor de cópia de `T` é chamado O(N) vezes, e 
  * A realocação ocorre O(log N) vezes.

6) Dado [ranges::distance](<#/doc/iterator/ranges/distance>)(rg) como N: 

  * Se `R` modela ranges::forward_range ou ranges::sized_range, 

    

  * Inicializa exatamente N elementos a partir do resultado da desreferenciação de iterators sucessivos de `rg`, e 
  * Nenhuma realocação ocorre. 

  * Caso contrário (`R` modela input range), 

    

  * O construtor de cópia ou movimento de `T` é chamado O(N) vezes, e 
  * A realocação ocorre O(log N) vezes.

7) Linear em other.size().

8) Constante.

9) Linear em other.size().

10) Linear em other.size() se alloc != other.get_allocator(), caso contrário constante.

11) Linear em init.size().

### Exceções

Chamadas para Allocator::allocate podem lançar exceções. 

### Notas

Após a construção de movimento do container (sobrecarga (8)), referências, ponteiros e iterators (exceto o iterator `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges; sobrecarga (6)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <vector>
    
    template<typename T>
    std::ostream& operator<<(std::ostream& s, const std::vector<T>& v)
    {
        s.put('{');
        for (char comma[]{'\0', ' ', '\0'}; const auto& e : v)
            s << comma << e, comma[0] = ',';
        return s << "}\n";
    }
    
    int main()
    {
        // C++11 initializer list syntax:
        std::vector<std::string> words1{"the", "frogurt", "is", "also", "cursed"};
        std::cout << "1: " << words1;
    
        // words2 == words1
        std::vector<std::string> words2(words1.begin(), words1.end());
        std::cout << "2: " << words2;
    
        // words3 == words1
        std::vector<std::string> words3(words1);
        std::cout << "3: " << words3;
    
        // words4 is {"Mo", "Mo", "Mo", "Mo", "Mo"}
        std::vector<std::string> words4(5, "Mo");
        std::cout << "4: " << words4;
    
        const auto rg = {"cat", "cow", "crow"};
    #ifdef __cpp_lib_containers_ranges
        std::vector<std::string> words5(std::from_range, rg); // overload (6)
    #else
        std::vector<std::string> words5(rg.begin(), rg.end()); // overload (5)
    #endif
        std::cout << "5: " << words5;
    }
```

Saída: 
```
    1: {the, frogurt, is, also, cursed}
    2: {the, frogurt, is, also, cursed}
    3: {the, frogurt, is, also, cursed}
    4: {Mo, Mo, Mo, Mo, Mo}
    5: {cat, cow, crow}
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 134](<https://cplusplus.github.io/LWG/issue134>) | C++98  | sobrecarga (5) permitia até 2N chamadas do construtor de cópia no caso de iterator de entrada  | alterado para O(N) chamadas   
[LWG 438](<https://cplusplus.github.io/LWG/issue438>) | C++98  | sobrecarga (5) chamaria a sobrecarga (4) apenas se `InputIt` fosse um tipo integral  | chama a sobrecarga (4) se `InputIt`  
não for um [LegacyInputIterator](<#/doc/named_req/InputIterator>)  
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão era explícito  | tornado não explícito
---|---|---|---
[LWG 2210](<https://cplusplus.github.io/LWG/issue2210>) | C++11  | a sobrecarga (3) não tinha um parâmetro alocador  | o parâmetro foi adicionado   
[N3346](<https://wg21.link/N3346>) | C++11  | para a sobrecarga (3), os elementos no  
container eram inicializados por valor  | eles são inseridos por padrão   
  
### Veja também

[ assign](<#/doc/container/vector/assign>) |  atribui valores ao container   
(função membro pública)  
[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)