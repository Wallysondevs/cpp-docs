# setjmp

Definido no cabeçalho `[<csetjmp>](<#/doc/header/csetjmp>)`

```c
#define setjmp(env) /* implementation-defined */
```

Salva o contexto de execução atual em uma variável env do tipo [std::jmp_buf](<#/doc/utility/program/jmp_buf>). Esta variável pode ser usada posteriormente para restaurar o contexto de execução atual pela função [std::longjmp](<#/doc/utility/program/longjmp>). Ou seja, quando uma chamada para a função [std::longjmp](<#/doc/utility/program/longjmp>) é feita, a execução continua no local da chamada específico que construiu a variável [std::jmp_buf](<#/doc/utility/program/jmp_buf>) passada para [std::longjmp](<#/doc/utility/program/longjmp>). Nesse caso, `setjmp` retorna o valor passado para [std::longjmp](<#/doc/utility/program/longjmp>).

A invocação de `setjmp` deve aparecer apenas em um dos seguintes contextos:

1.  a expressão de controle inteira de [`if`](<#/doc/language/if>), [`switch`](<#/doc/language/switch>), [`while`](<#/doc/language/while>), [`do-while`](<#/doc/language/do>), [`for`](<#/doc/language/for>).
    ```cpp
    switch (setjmp(env)) { // ...
    ```

2.  um operando de um operador relacional ou de igualdade com o outro operando sendo uma expressão constante inteira, com a expressão resultante sendo a expressão de controle inteira de [`if`](<#/doc/language/if>), [`switch`](<#/doc/language/switch>), [`while`](<#/doc/language/while>), [`do-while`](<#/doc/language/do>), [`for`](<#/doc/language/for>).
    ```cpp
    if (setjmp(env) > 0) { // ...
    ```

3.  o operando de um operador unário `!` com a expressão resultante sendo a expressão de controle inteira de [`if`](<#/doc/language/if>), [`switch`](<#/doc/language/switch>), [`while`](<#/doc/language/while>), [`do-while`](<#/doc/language/do>), [`for`](<#/doc/language/for>).
    ```cpp
    while (!setjmp(env)) { // ...
    ```

4.  a expressão inteira de uma [declaração de expressão](<#/doc/language/statements>) (possivelmente convertida para void).
    ```cpp
    setjmp(env);
    ```

Se `setjmp` aparecer em qualquer outro contexto, o comportamento é indefinido.

Além disso, o comportamento é indefinido se `setjmp` for invocado em uma [coroutine](<#/doc/language/coroutines>) em um local onde o operador `co_await` possa ser usado. | (desde C++20)

Ao retornar ao escopo de `setjmp`:

*   todos os objetos acessíveis, flags de status de ponto flutuante e outros componentes da máquina abstrata têm os mesmos valores que tinham quando [std::longjmp](<#/doc/utility/program/longjmp>) foi executado,
*   exceto pelas variáveis locais não-[volatile](<#/doc/language/cv>) na função que contém a invocação de `setjmp`, cujos valores são indeterminados se tiverem sido alterados desde a invocação de `setjmp`.

### Parâmetros

- **env** — variável para salvar o estado de execução do programa

### Valor de retorno

`0` se a macro foi chamada pelo código original e o contexto de execução foi salvo em `env`.

Valor diferente de zero se um salto não local acabou de ser realizado. O valor de retorno é o mesmo que o passado para [std::longjmp](<#/doc/utility/program/longjmp>).

### Notas

Os requisitos acima proíbem o uso do valor de retorno de `setjmp` em fluxo de dados (por exemplo, para inicializar ou atribuir um objeto com ele). O valor de retorno só pode ser usado em fluxo de controle ou descartado.

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

### Veja também

[ longjmp](<#/doc/utility/program/longjmp>) | salta para o local especificado
(função)
[Documentação C](<#/>) para setjmp
*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.