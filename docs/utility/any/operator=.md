# std::any::operator=

```cpp
any& operator=( const any& rhs );  // (1) (desde C++17)
any& operator=( any&& rhs ) noexcept;  // (2) (desde C++17)
template< typename ValueType >
any& operator=( ValueType&& rhs );  // (3) (desde C++17)
```

Atribui conteúdo ao valor contido.

1) Atribui copiando o estado de `rhs`, como se por `[std::any](<#/doc/utility/any>)(rhs).swap(*this)`.

2) Atribui movendo o estado de `rhs`, como se por `[std::any](<#/doc/utility/any>)(std::move(rhs)).swap(*this)`. `rhs` é deixado em um estado válido, mas não especificado, após a atribuição.

3) Atribui o tipo e o valor de `rhs`, como se por `[std::any](<#/doc/utility/any>)([std::forward](<#/doc/utility/forward>)<ValueType>(rhs)).swap(*this)`. Esta sobrecarga participa da resolução de sobrecarga somente se `[std::decay_t](<#/doc/types/decay>)<ValueType>` não for do mesmo tipo que `[std::any](<#/doc/utility/any>)` e `[std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)<ValueType>>` for `true`.

### Parâmetros de template

- **ValueType** — tipo de valor contido
Requisitos de tipo
-`[std::decay_t](<#/doc/types/decay>)<ValueType>` deve satisfazer os requisitos de `[CopyConstructible](<#/doc/named_req/CopyConstructible>)`.

### Parâmetros

- **rhs** — objeto cujo valor contido deve ser atribuído

### Valor de retorno

`*this`

### Exceções

1,3) Lança `[std::bad_alloc](<#/doc/memory/new/bad_alloc>)` ou qualquer exceção lançada pelo construtor do tipo contido. Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <cassert>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <typeinfo>
    
    int main()
    {
        using namespace std::string_literals;
        std::string cat{"cat"};
    
        std::any a1{42};
        std::any a2{cat};
        assert(a1.type() == typeid(int));
        assert(a2.type() == typeid(std::string));
    
        a1 = a2; // overload (1)
        assert(a1.type() == typeid(std::string));
        assert(a2.type() == typeid(std::string));
        assert(std::any_cast<std::string&>(a1) == cat);
        assert(std::any_cast<std::string&>(a2) == cat);
    
        a1 = 96; // overload (3)
        a2 = "dog"s; // overload (3)
        a1 = std::move(a2); // overload (2)
        assert(a1.type() == typeid(std::string));
        assert(std::any_cast<std::string&>(a1) == "dog");
        // The state of a2 is valid but unspecified. In fact,
        // it is void in gcc/clang and std::string in msvc.
        std::cout << "a2.type(): " << std::quoted(a2.type().name()) << '\n';
    
        a1 = std::move(cat); // overload (3)
        assert(*std::any_cast<std::string>(&a1) == "cat");
        // The state of cat is valid but indeterminate:
        std::cout << "cat: " << std::quoted(cat) << '\n';
    }
```

Saída possível:
```
    a2.type(): "void"
    cat: ""
```

### Veja também

[ (constructor)](<#/doc/utility/any/any>) | constrói um objeto `any`
(função membro pública)