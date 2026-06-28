# Atributo C++: nodiscard (desde C++17)

Se uma função declarada `nodiscard` ou uma função que retorna uma enumeração ou classe declarada `nodiscard` por valor for chamada a partir de uma [expressão de valor descartado](<#/doc/language/expressions>) diferente de um cast para void, o compilador é encorajado a emitir um aviso.

### Sintaxe

---
```cpp
`[[nodiscard]]`  // (1) (desde C++17)
`[[nodiscard(` string-literal `)]]`  // (2) (desde C++20)
```
- **string-literal** — um [literal de string não avaliado](<#/doc/language/string_literal>) que pode ser usado para explicar a razão pela qual o resultado não deve ser descartado

### Explicação

Aparece em uma declaração de função, declaração de enumeração ou declaração de classe.

Se, a partir de uma [expressão de valor descartado](<#/doc/language/expressions>) diferente de um cast para void,

*   uma função declarada `nodiscard` for chamada, ou
*   uma função que retorna uma enumeração ou classe declarada `nodiscard` por valor for chamada, ou
*   um construtor declarado `nodiscard` for chamado por [conversão de tipo explícita](<#/doc/language/explicit_cast>) ou [`static_cast`](<#/doc/language/static_cast>), ou
*   um objeto de um tipo de enumeração ou classe declarado `nodiscard` for inicializado por [conversão de tipo explícita](<#/doc/language/explicit_cast>) ou [`static_cast`](<#/doc/language/static_cast>),

o compilador é encorajado a emitir um aviso.

O literal de string, se especificado, é geralmente incluído nos avisos. | (desde C++20)

### Exemplo

Execute este código
```cpp
    struct [[nodiscard]] error_info { /*...*/ };
    
    error_info enable_missile_safety_mode() { /*...*/ return {}; }
    
    void launch_missiles() { /*...*/ }
    
    void test_missiles()
    {
        enable_missile_safety_mode(); // o compilador pode avisar sobre o descarte de um valor nodiscard
        launch_missiles();
    }
    
    error_info& foo() { static error_info e; /*...*/ return e; }
    
    void f1() { foo(); } // tipo nodiscard não é retornado por valor, sem aviso
    
    // nodiscard( literal-de-string ) (desde C++20):
    [[nodiscard("PURE FUN")]] int strategic_value(int x, int y) { return x ^ y; }
    
    int main()
    {
        strategic_value(4, 2); // o compilador pode avisar sobre o descarte de um valor nodiscard
        auto z = strategic_value(0, 0); // OK: valor de retorno não é descartado
        return z;
    }
```

Saída possível:
```
    game.cpp:5:4: warning: ignoring return value of function declared with ⮠
     'nodiscard' attribute
    game.cpp:17:5: warning: ignoring return value of function declared with ⮠
     'nodiscard' attribute: PURE FUN
```

### Biblioteca padrão

As seguintes funções padrão são declaradas com o atributo `nodiscard`: | Conteúdo estendido
---
|

##### Funções de alocação

---
[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(function)
[ allocate](<#/doc/memory/allocator/allocate>) | aloca armazenamento não inicializado
(public member function of `std::allocator<T>`)
[ allocate](<#/doc/memory/allocator_traits/allocate>)[static] | aloca armazenamento não inicializado usando o alocador
(public static member function of `std::allocator_traits<Alloc>`)
[ allocate](<#/doc/memory/memory_resource/allocate>) | aloca memória
(public member function of `std::pmr::memory_resource`)
[ allocate](<#/doc/memory/polymorphic_allocator/allocate>) | aloca memória
(public member function of `std::pmr::polymorphic_allocator<T>`)
[ allocate](<#/doc/memory/scoped_allocator_adaptor/allocate>) | aloca armazenamento não inicializado usando o alocador externo
(public member function of `std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>`)

##### Acesso indireto

[ launder](<#/doc/utility/launder>)(C++17) | barreira de otimização de ponteiro
(function template)
[ assume_aligned](<#/doc/memory/assume_aligned>)(C++20) | informa ao compilador que um ponteiro está alinhado
(function template)

##### Funções de verificação de vazio

[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(function template)
[ empty](<#/doc/container/node_handle>) | verifica se o node handle está vazio
(public member function of `_node handle_`)
[ empty](<#/doc/container/array/empty>) | verifica se o container está vazio
(public member function of `std::array<T,N>`)
[ empty](<#/doc/string/basic_string/empty>) | verifica se a string está vazia
(public member function of `std::basic_string<CharT,Traits,Allocator>`)
[ empty](<#/doc/string/basic_string_view/empty>) | verifica se a view está vazia
(public member function of `std::basic_string_view<CharT,Traits>`)
[ empty](<#/doc/container/deque/empty>) | verifica se o container está vazio
(public member function of `std::deque<T,Allocator>`)
[ empty](<#/doc/container/forward_list/empty>) | verifica se o container está vazio
(public member function of `std::forward_list<T,Allocator>`)
[ empty](<#/doc/container/list/empty>) | verifica se o container está vazio
(public member function of `std::list<T,Allocator>`)
[ empty](<#/doc/container/map/empty>) | verifica se o container está vazio
(public member function of `std::map<Key,T,Compare,Allocator>`)
[ empty](<#/doc/regex/match_results/empty>) | verifica se a correspondência foi bem-sucedida
(public member function of `std::match_results<BidirIt,Alloc>`)
[ empty](<#/doc/container/multimap/empty>) | verifica se o container está vazio
(public member function of `std::multimap<Key,T,Compare,Allocator>`)
[ empty](<#/doc/container/multiset/empty>) | verifica se o container está vazio
(public member function of `std::multiset<Key,Compare,Allocator>`)
[ empty](<#/doc/container/priority_queue/empty>) | verifica se o adaptador de container está vazio
(public member function of `std::priority_queue<T,Container,Compare>`)
[ empty](<#/doc/container/queue/empty>) | verifica se o adaptador de container está vazio
(public member function of `std::queue<T,Container>`)
[ empty](<#/doc/container/set/empty>) | verifica se o container está vazio
(public member function of `std::set<Key,Compare,Allocator>`)
[ empty](<#/doc/container/span/empty>) | verifica se a sequência está vazia
(public member function of `std::span<T,Extent>`)
[ empty](<#/doc/container/stack/empty>) | verifica se o adaptador de container está vazio
(public member function of `std::stack<T,Container>`)
[ empty](<#/doc/container/unordered_map/empty>) | verifica se o container está vazio
(public member function of `std::unordered_map<Key,T,Hash,KeyEqual,Allocator>`)
[ empty](<#/doc/container/unordered_multimap/empty>) | verifica se o container está vazio
(public member function of `std::unordered_multimap<Key,T,Hash,KeyEqual,Allocator>`)
[ empty](<#/doc/container/unordered_multiset/empty>) | verifica se o container está vazio
(public member function of `std::unordered_multiset<Key,Hash,KeyEqual,Allocator>`)
[ empty](<#/doc/container/unordered_set/empty>) | verifica se o container está vazio
(public member function of `std::unordered_set<Key,Hash,KeyEqual,Allocator>`)
[ empty](<#/doc/container/vector/empty>) | verifica se o container está vazio
(public member function of `std::vector<T,Allocator>`)
[ empty](<#/doc/filesystem/path/empty>) | verifica se o path está vazio
(public member function of `std::filesystem::path`)

##### Diversos

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(function template)

(até C++26)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P1771R1](<https://wg21.link/P1771R1>) | C++17 | `[[nodiscard]]` em construtores não tem efeito | pode causar um aviso se o objeto construído for descartado

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   9.12.9 Atributo Nodiscard [dcl.attr.nodiscard]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   9.12.8 Atributo Nodiscard [dcl.attr.nodiscard]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   10.6.7 Atributo Nodiscard [dcl.attr.nodiscard]

### Veja também

[ ignore](<#/doc/utility/tuple/ignore>)(C++11) | marcador para pular um elemento ao desempacotar uma `tuple` usando [`tie`](<#/doc/utility/tuple/tie>)
(constant)
[Documentação C](<#/>) para nodiscard