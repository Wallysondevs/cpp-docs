# std::mem_fn

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class M, class T >
/* unspecified */ mem_fn( M T::* pm ) noexcept;
(constexpr desde C++20)
```

O template de função `std::mem_fn` gera objetos wrapper para ponteiros para membros, que podem armazenar, copiar e invocar um [ponteiro para membro](<#/doc/language/pointer>). Tanto referências quanto ponteiros (incluindo smart pointers) para um objeto podem ser usados ao invocar um `std::mem_fn`.

### Parâmetros

- **pm** — ponteiro para membro que será encapsulado

### Valor de retorno

`std::mem_fn` retorna um call wrapper `fn` de tipo não especificado que possui os seguintes membros:

## std::mem_fn _tipo de retorno_

### Tipos de membro

| tipo | definição
---|---
`result_type`(obsoleto desde C++17) | o tipo de retorno de `pm` se `pm` é um ponteiro para função membro, não definido para ponteiro para objeto membro
`argument_type`(obsoleto desde C++17) | `T*`, possivelmente cv-qualified, se `pm` é um ponteiro para função membro que não recebe argumentos
`first_argument_type`(obsoleto desde C++17) | `T*` se `pm` é um ponteiro para função membro que recebe um argumento
`second_argument_type`(obsoleto desde C++17) | `T1` se `pm` é um ponteiro para função membro que recebe um argumento do tipo `T1`
(até C++20)

### Função membro

template< class... Args >
/* see below */ operator()(Args&&... args) /* cvref-qualifiers */
noexcept(/* see below */); | | (constexpr desde C++20)

A expressão `fn(args)` é equivalente a [`_INVOKE_`](<#/doc/utility/functional>)`(pmd, args)`, onde `pmd` é o objeto [Callable](<#/doc/named_req/Callable>) mantido por `fn`, é do tipo `M T::*` e é inicializado diretamente sem lista com `pm`.

Assim, o tipo de retorno de `operator()` é [std::result_of](<#/doc/types/result_of>)`<decltype(pm)(Args&&...)>::type` ou, equivalentemente, [std::invoke_result_t](<#/doc/types/result_of>)`<decltype(pm), Args&&...>`, e o valor no especificador `noexcept` é igual a [std::is_nothrow_invocable_v](<#/doc/types/is_invocable>)`<decltype(pm), Args&&...>` (desde C++17).

Cada argumento em `args` é perfeitamente encaminhado, como se por [std::forward](<#/doc/utility/forward>)`<Args>(args)`...

### Exemplo

Use `std::mem_fn` para armazenar e executar uma função membro e um objeto membro:

Run this code
```cpp
    #include <functional>
    #include <iostream>
    #include <memory>
    
    struct Foo
    {
        void display_greeting()
        {
            std::cout << "Hello, world.\n";
        }
    
        void display_number(int i)
        {
            std::cout << "number: " << i << '\n';
        }
    
        int add_xy(int x, int y)
        {
            return data + x + y;
        }
    
        template<typename... Args> int add_many(Args... args)
        {
            return data + (args + ...);
        }
    
        auto add_them(auto... args) // C++20 required
        {
            return data + (args + ...);
        }
    
        int data = 7;
    };
    
    int main()
    {
        auto f = Foo{};
    
        auto greet = std::mem_fn(&Foo::display_greeting);
        greet(f);
    
        auto print_num = std::mem_fn(&Foo::display_number);
        print_num(f, 42);
    
        auto access_data = std::mem_fn(&Foo::data);
        std::cout << "data: " << access_data(f) << '\n';
    
        auto add_xy = std::mem_fn(&Foo::add_xy);
        std::cout << "add_xy: " << add_xy(f, 1, 2) << '\n';
    
        auto u = std::make_unique<Foo>();
        std::cout << "access_data(u): " << access_data(u) << '\n';
        std::cout << "add_xy(u, 1, 2): " << add_xy(u, 1, 2) << '\n';
    
        auto add_many = std::mem_fn(&Foo::add_many<short, int, long>);
        std::cout << "add_many(u, ...): " << add_many(u, 1, 2, 3) << '\n';
    
        auto add_them = std::mem_fn(&Foo::add_them<short, int, float, double>);
        std::cout << "add_them(u, ...): " << add_them(u, 5, 7, 10.0f, 13.0) << '\n';
    }
```

Output:
```
    Hello, world.
    number: 42
    data: 7
    add_xy: 10
    access_data(u): 7
    add_xy(u, 1, 2): 10
    add_many(u, ...): 13
    add_them(u, ...): 42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2048](<https://cplusplus.github.io/LWG/issue2048>) | C++11 | sobrecargas desnecessárias fornecidas | removido
[LWG 2489](<https://cplusplus.github.io/LWG/issue2489>) | C++11 | noexcept não exigido | exigido

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copiável
(template de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto callable que suporte qualificadores em uma dada assinatura de chamada
(template de classe)
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(template de função)