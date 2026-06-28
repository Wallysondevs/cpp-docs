# std::longjmp

Definido no cabeçalho `[<csetjmp>](<#/doc/header/csetjmp>)`

```c
void longjmp( std::jmp_buf env, int status );
[[noreturn]] void longjmp( std::jmp_buf env, int status );
```

Carrega o contexto de execução env salvo por uma chamada anterior a [setjmp](<#/doc/utility/program/setjmp>). Esta função não retorna. O controle é transferido para o local da chamada da macro [setjmp](<#/doc/utility/program/setjmp>) que configurou env. Esse [setjmp](<#/doc/utility/program/setjmp>) então retorna o valor, passado como status.

Se a função que chamou [setjmp](<#/doc/utility/program/setjmp>) tiver sido encerrada, o comportamento é indefinido (em outras palavras, apenas long jumps para cima na pilha de chamadas são permitidos).

### Restrições extras em C++

Além do [`longjmp`](<#/>) do C, `std::longjmp` do C++ possui um comportamento mais restrito.

Se a substituição de `std::longjmp` por throw e [setjmp](<#/doc/utility/program/setjmp>) por catch invocaria um [destrutor não-trivial](<#/doc/language/destructor>) para qualquer objeto automático, o comportamento de tal `std::longjmp` é indefinido.

O comportamento é indefinido se `std::longjmp` for chamado em uma [coroutine](<#/doc/language/coroutines>) em um local onde o operador co_await possa ser usado. | (desde C++20)

### Parâmetros

- **env** — variável que se refere ao estado de execução do programa salvo por [setjmp](<#/doc/utility/program/setjmp>)
- **status** — o valor a ser retornado de [setjmp](<#/doc/utility/program/setjmp>). Se for igual a ​0​, 1 é usado em seu lugar

### Valor de retorno

(nenhum)

### Notas

`std::longjmp` é o mecanismo usado em C para lidar com condições de erro inesperadas onde a função não pode retornar de forma significativa. C++ geralmente usa [tratamento de exceções](<#/doc/language/exceptions>) para este propósito.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cmath>
    #include <csetjmp>
    #include <cstdlib>
    #include <format>
    #include <iostream>
    
    std::jmp_buf solver_error_handler;
    
    std::array<double, 2> solve_quadratic_equation(double a, double b, double c)
    {
        const double discriminant = b * b - 4.0 * a * c;
        if (discriminant < 0)
            std::longjmp(solver_error_handler, true); // Go to error handler
    
        const double delta = std::sqrt(discriminant) / (2.0 * a);
        const double argmin = -b / (2.0 * a);
        return {argmin - delta, argmin + delta};
    }
    
    void show_quadratic_equation_solution(double a, double b, double c)
    {
        std::cout << std::format("Solving {}x² + {}x + {} = 0...\n", a, b, c);
        auto [x_0, x_1] = solve_quadratic_equation(a, b, c);
        std::cout << std::format("x₁ = {}, x₂ = {}\n\n", x_0, x_1);
    }
    
    int main()
    {
        if (setjmp(solver_error_handler))
        {
            // Error handler for solver
            std::cout << "No real solution\n";
            return EXIT_FAILURE;
        }
    
        for (auto [a, b, c] : {std::array{1, -3, 2}, {2, -3, -2}, {1, 2, 3}})
            show_quadratic_equation_solution(a, b, c);
    
        return EXIT_SUCCESS;
    }
```

Saída:
```
    Solving 1x² + -3x + 2 = 0...
    x₁ = 1, x₂ = 2
    
    Solving 2x² + -3x + -2 = 0...
    x₁ = -0.5, x₂ = 2
    
    Solving 1x² + 2x + 3 = 0...
    No real solution
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 619](<https://cplusplus.github.io/LWG/issue619>) | C++98 | a redação das restrições extras em C++ era vaga | melhorou a redação
[LWG 894](<https://cplusplus.github.io/LWG/issue894>) | C++98 | o comportamento era indefinido se a substituição de `std::longjmp` por throw e [setjmp](<#/doc/utility/program/setjmp>) por catch destruiria qualquer objeto automático | o comportamento é indefinido apenas se um destrutor não-trivial para qualquer objeto automático for invocado

### Veja também

[ setjmp](<#/doc/utility/program/setjmp>) | salva o contexto
---|---
(macro de função) |
[Documentação C](<#/>) para longjmp