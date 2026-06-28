# std::ranges::construct_at

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< class T, class... Args >
constexpr T* construct_at( T* location, Args&&... args );
```

Cria um objeto `T` inicializado com os argumentos em args no endereço location fornecido.

Equivalente a ` `if constexpr ([std::is_array_v](<#/doc/types/is_array>)&lt;T&gt;)
` `return ::new ([`_voidify_`](<#/doc/memory/voidify>) ﻿(*location)) T[1]();
else
` `return ::new ([`_voidify_`](<#/doc/memory/voidify>) ﻿(*location)) T([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...); , exceto que `construct_at` pode ser usado na avaliação de [expressões constantes](<#/doc/language/constant_expression>)(até C++26).

Quando `construct_at` é chamado na avaliação de alguma expressão constante expr, location deve apontar para um armazenamento obtido por [std::allocator](<#/doc/memory/allocator>)&lt;T&gt;::allocate ou para um objeto cuja vida útil começou dentro da avaliação de expr.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

  * [std::is_unbounded_array_v](<#/doc/types/is_unbounded_array>)&lt;T&gt; é falso.
  * `::new([std::declval](<#/doc/utility/declval>)<void*>()) T([std::declval](<#/doc/utility/declval>)<Args>()...) ` é bem-formado quando tratado como um [operando não avaliado](<#/doc/language/expressions>).

Se [std::is_array_v](<#/doc/types/is_array>)&lt;T&gt; for verdadeiro e sizeof...(Args) for diferente de zero, o programa é malformado.

As entidades semelhantes a funções descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para a [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **location** — ponteiro para o armazenamento não inicializado no qual um objeto `T` será construído
- **args...** — argumentos usados para inicialização

### Valor de retorno

location

### Notas

`std::ranges::construct_at` se comporta exatamente como [std::construct_at](<#/doc/memory/construct_at>), exceto que é invisível para a pesquisa dependente de argumento.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct S
    {
        int x;
        float y;
        double z;
    
        S(int x, float y, double z) : x{x}, y{y}, z{z} { std::cout << "S::S();\n"; }
    
        ~S() { std::cout << "S::~S();\n"; }
    
        void print() const
        {
            std::cout << "S { x=" << x << "; y=" << y << "; z=" << z << "; };\n";
        }
    };
    
    int main()
    {
        alignas(S) unsigned char buf[sizeof(S)];
    
        S* ptr = std::ranges::construct_at(reinterpret_cast<S*>(buf), 42, 2.71828f, 3.1415);
        ptr->print();
    
        std::ranges::destroy_at(ptr);
    }
```

Saída:
```
    S::S();
    S { x=42; y=2.71828; z=3.1415; };
    S::~S();
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3436](<https://cplusplus.github.io/LWG/issue3436>) | C++20 | `construct_at` não podia criar objetos de tipos array | pode inicializar por valor arrays limitados
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | `construct_at` podia criar objetos de tipos cv-qualificados | apenas tipos cv-não qualificados são permitidos

### Veja também

[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(C++20) | destrói um objeto em um endereço fornecido
(objeto de função de algoritmo)
[ construct_at](<#/doc/memory/construct_at>)(C++20) | cria um objeto em um endereço fornecido
(modelo de função)