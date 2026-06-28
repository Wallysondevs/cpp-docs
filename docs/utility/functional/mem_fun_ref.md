# std::mem_fun_ref

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Res, class T >
std::mem_fun_ref_t<Res,T> mem_fun_ref( Res (T::*f)() );
(removido em C++17)
template< class Res, class T >
std::const_mem_fun_ref_t<Res,T> mem_fun_ref( Res (T::*f)() const );
(removido em C++17)
template< class Res, class T, class Arg >
std::mem_fun1_ref_t<Res,T,Arg> mem_fun_ref( Res (T::*f)(Arg) );
(removido em C++17)
template< class Res, class T, class Arg >
std::const_mem_fun1_ref_t<Res,T,Arg> mem_fun_ref( Res (T::*f)(Arg) const );
(removido em C++17)
```

Cria um objeto wrapper de função membro, deduzindo o tipo alvo a partir dos argumentos do template. O objeto wrapper espera uma referência para um objeto do tipo `T` como o primeiro parâmetro para seu operator().

1) Efetivamente chama [std::mem_fun_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)<S,T>(f) ou [std::const_mem_fun_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)<S,T>(f).

2) Efetivamente chama [std::mem_fun1_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)<S,T>(f) ou [std::const_mem_fun1_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)<S,T>(f).

Esta função e os tipos relacionados foram marcados como obsoletos (deprecated) em C++11 e removidos em C++17 em favor dos mais gerais [std::mem_fn](<#/doc/utility/functional/mem_fn>) e [std::bind](<#/doc/utility/functional/bind>), ambos os quais criam objetos de função compatíveis com adaptadores chamáveis a partir de funções membro.

### Parâmetros

- **f** — ponteiro para uma função membro para criar um wrapper

### Valor de retorno

Um objeto de função que encapsula f.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

A diferença entre [std::mem_fun](<#/doc/utility/functional/mem_fun>) e std::mem_fun_ref é que o primeiro produz um wrapper de função que espera um ponteiro para um objeto, enquanto o último — uma referência.

### Exemplo

Usa `std::mem_fun_ref` para vincular a função membro [size()](<#/doc/string/basic_string/size>) de [std::string](<#/doc/string/basic_string>).

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<std::string> v = {"once", "upon", "a", "time"};
        std::transform(v.cbegin(), v.cend(),
                       std::ostream_iterator<std::size_t>(std::cout, " "),
                       std::mem_fun_ref(&std::string::size));
    }
```

Saída:
```
    4 4 1 4
```

### Veja também

[ mem_fun](<#/doc/utility/functional/mem_fun>)(obsoleto desde C++11)(removido em C++17) | cria um wrapper a partir de um ponteiro para função membro, chamável com um ponteiro para objeto
(modelo de função)
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão