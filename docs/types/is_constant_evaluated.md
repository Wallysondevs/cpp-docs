# std::is_constant_evaluated

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
constexpr bool is_constant_evaluated() noexcept;
```

Detecta se a chamada da função ocorre dentro de um contexto avaliado em tempo de compilação (constant-evaluated context). Retorna true se a avaliação da chamada ocorre dentro da avaliação de uma expressão ou conversão que é [manifestamente avaliada em tempo de compilação](<#/doc/language/constant_expression>); caso contrário, retorna false.

Para determinar se os inicializadores das seguintes variáveis são manifestamente avaliados em tempo de compilação, os compiladores podem primeiro realizar uma avaliação constante de teste:

*   variáveis com tipo de referência ou tipo integral ou de enumeração qualificado como const;
*   variáveis static e thread local.

Não é recomendado depender do resultado neste caso.
```cpp
    int y = 0;
    const int a = std::is_constant_evaluated() ? y : 1;
    // A avaliação constante de teste falha. A avaliação constante é descartada.
    // A variável a é inicializada dinamicamente com 1

    const int b = std::is_constant_evaluated() ? 2 : y;
    // A avaliação constante com std::is_constant_evaluated() == true é bem-sucedida.
    // A variável b é inicializada estaticamente com 2
```

### Parâmetros

(nenhum)

### Valor de retorno

true se a avaliação da chamada ocorre dentro da avaliação de uma expressão ou conversão que é manifestamente avaliada em tempo de compilação; caso contrário, false.

### Possível implementação
```cpp
    // Esta implementação requer C++23 se consteval.
    constexpr bool is_constant_evaluated() noexcept
    {
        if consteval
        {
            return true;
        }
        else
        {
            return false;
        }
    }
```

---

### Observações

Quando usado diretamente como condição de uma declaração [`static_assert`](<#/doc/language/static_assert>) ou de uma [instrução constexpr if](<#/doc/language/if>), std::is_constant_evaluated() sempre retorna true.

Como [`if consteval`](<#/doc/language/if>) está ausente no C++20, `std::is_constant_evaluated` é tipicamente implementado usando uma extensão do compilador.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_is_constant_evaluated`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | `std::is_constant_evaluated`

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <type_traits>

    constexpr double power(double b, int x)
    {
        if (std::is_constant_evaluated() && !(b == 0.0 && x < 0))
        {
            // Um contexto de avaliação constante: Use um algoritmo amigável a constexpr.
            if (x == 0)
                return 1.0;
            double r {1.0};
            double p {x > 0 ? b : 1.0 / b};
            for (auto u = unsigned(x > 0 ? x : -x); u != 0; u /= 2)
            {
                if (u & 1)
                    r *= p;
                p *= p;
            }
            return r;
        }
        else
        {
            // Deixe o gerador de código resolver.
            return std::pow(b, double(x));
        }
    }

    int main()
    {
        // Um contexto de expressão constante
        constexpr double kilo = power(10.0, 3);
        int n = 3;
        // Não é uma expressão constante, porque n não pode ser convertido para um rvalue
        // em um contexto de expressão constante
        // Equivalente a std::pow(10.0, double(n))
        double mucho = power(10.0, n);

        std::cout << kilo << " " << mucho << "\n"; // (3)
    }
```

Saída:
```
    1000 1000
```

### Veja também

[`constexpr` specifier](<#/doc/language/constexpr>)(C++11) | especifica que o valor de uma variável ou função pode ser computado em tempo de compilação
---|---
[`consteval` specifier](<#/doc/language/consteval>)(C++20) | especifica que uma função é uma _função imediata_ , ou seja, toda chamada à função deve estar em uma avaliação constante
[`constinit` specifier](<#/doc/language/constinit>)(C++20) | afirma que uma variável possui inicialização estática, ou seja, [inicialização zero](<#/doc/language/zero_initialization>) e [inicialização constante](<#/doc/language/constant_initialization>)