# std::jmp_buf

Definido no cabeçalho `[<csetjmp>](<#/doc/header/csetjmp>)`

```c
typedef /* unspecified */ jmp_buf;
```

O tipo `std::jmp_buf` é um tipo array adequado para armazenar informações para restaurar um ambiente de chamada. A informação armazenada é suficiente para restaurar a execução no bloco correto do programa e a invocação desse bloco. O estado dos flags de status de ponto flutuante, ou arquivos abertos, ou quaisquer outros dados não é armazenado em um objeto do tipo `std::jmp_buf`.

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
            std::longjmp(solver_error_handler, true); // Ir para o handler de erro
     
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
            // Handler de erro para o resolvedor
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

[ setjmp](<#/doc/utility/program/setjmp>) | salva o contexto
(macro de função)
[ longjmp](<#/doc/utility/program/longjmp>) | salta para o local especificado
(função)
[Documentação C](<#/>) para jmp_buf