# std::any::any

```cpp
constexpr any() noexcept;  // (1) (desde C++17)
any( const any& other );  // (2) (desde C++17)
any( any&& other ) noexcept;  // (3) (desde C++17)
template< class ValueType >
any( ValueType&& value );  // (4) (desde C++17)
template< class ValueType, class... Args >
explicit any( std::in_place_type_t<ValueType>, Args&&... args );  // (5) (desde C++17)
template< class ValueType, class U, class... Args >
explicit any( std::in_place_type_t<ValueType>, std::initializer_list<U> il,
Args&&... args );  // (6) (desde C++17)
```

Constrói um novo objeto `any`.

1) Constrói um objeto vazio.

2,3) Copia (2) ou move (3) o conteúdo de other para uma nova instância, de modo que qualquer conteúdo seja equivalente em tipo e valor aos de other antes da chamada do construtor, ou vazio se other estiver vazio. Formalmente,

2) Se other estiver vazio, o objeto construído estará vazio. Caso contrário, equivalente a any([std::in_place_type](<#/doc/utility/in_place>)&lt;T&gt;, [std::any_cast](<#/doc/utility/any/any_cast>)&lt;const T&&gt;(other)), onde `T` é o tipo do objeto contido em other.

3) Se other estiver vazio, o objeto construído estará vazio. Caso contrário, o objeto construído contém o objeto contido em other, ou um objeto do mesmo tipo construído a partir do objeto contido em other, considerando esse objeto como um rvalue.

4) Constrói um objeto com conteúdo inicial sendo um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [inicializado diretamente](<#/doc/language/direct_initialization>) a partir de [std::forward](<#/doc/utility/forward>)&lt;ValueType&gt;(value).

  * Esta sobrecarga participa da resolução de sobrecarga apenas se [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt; não for do mesmo tipo que `any` nem uma especialização de [std::in_place_type_t](<#/doc/utility/in_place>), e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;> for verdadeiro.

5) Constrói um objeto com conteúdo inicial sendo um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [inicializado diretamente sem lista](<#/doc/language/direct_initialization>) a partir de [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, Args...> e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;> forem ambos verdadeiros.

6) Constrói um objeto com conteúdo inicial sendo um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [inicializado diretamente sem lista](<#/doc/language/direct_initialization>) a partir de il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;> forem ambos verdadeiros.

### Parâmetros de template

- **ValueType** — tipo de valor contido
Requisitos de tipo
-`std::decay_t<ValueType>` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

- **other** — outro objeto `any` para copiar ou mover
- **value** — valor para inicializar o valor contido
- **il, args** — argumentos a serem passados para o construtor do objeto contido

### Exceções

2,4-6) Lança qualquer exceção lançada pelo construtor do tipo contido.

### Notas

Como o construtor padrão é constexpr, objetos `std::any` estáticos são inicializados como parte da [inicialização estática não local](<#/doc/language/initialization>), antes que qualquer inicialização dinâmica não local comece. Isso torna seguro usar um objeto do tipo `std::any` em um construtor de qualquer objeto estático.

### Exemplo

Execute este código
```cpp
    #include <boost/core/demangle.hpp>
    
    #include <any>
    #include <initializer_list>
    #include <iostream>
    #include <memory>
    #include <set>
    #include <string>
    #include <utility>
    
    struct A
    {
        int age;
        std::string name;
        double salary;
    
    #if __cpp_aggregate_paren_init < 201902L
        // Required before C++20 for in-place construction
        A(int age, std::string name, double salary)
            : age(age), name(std::move(name)), salary(salary) {}
    #endif
    };
    
    // Using abi demangle to print nice type name of instance of any holding
    void printType(const std::any& a)
    {
        std::cout << boost::core::demangle(a.type().name()) << '\n';
    }
    
    int main()
    {
        // Constructor #4: std::any holding int
        std::any a1{7};
    
        // Constructor #5: std::any holding A, constructed in place
        std::any a2(std::in_place_type<A>, 30, "Ada", 1000.25);
    
        // Constructor #6: std::any holding a set of A with custom comparison
        auto lambda = { return l.age < r.age; };
        std::any a3(
            std::in_place_type<std::set<A, decltype(lambda)>>,
            {
                A{39, std::string{"Ada"}, 100.25},
                A{20, std::string{"Bob"}, 75.5}
            },
            lambda);
    
        printType(a1);
        printType(a2);
        printType(a3);
    }
```

Saída possível:
```
    int
    A
    std::set<A, main::{lambda(auto:1&&, auto:2&&)#1}, std::allocator<A> >
```

### Veja também

[ operator=](<#/>) | atribui um objeto `any`
(função membro pública)