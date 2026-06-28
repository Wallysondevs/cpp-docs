# va_start

Definido no cabeçalho `[<cstdarg>](<#/doc/header/cstdarg>)`

```c
void va_start( std::va_list ap, parm_n );
```

A macro `va_start` permite o acesso aos argumentos variáveis que seguem o argumento nomeado parm_n.

`va_start` deve ser invocada com uma instância de um objeto [va_list](<#/doc/utility/variadic/va_list>) válido ap antes de quaisquer chamadas para [va_arg](<#/doc/utility/variadic/va_arg>).

Se parm_n for uma [pack expansion](<#/doc/language/parameter_pack>) ou uma entidade resultante de uma [lambda capture](<#/doc/language/lambda>), o programa é malformado, sem diagnóstico exigido. | (desde C++11)

Se parm_n for do tipo referência, ou de um tipo não compatível com o tipo que resulta das [default argument promotions](<#/doc/language/variadic_arguments>), o comportamento é indefinido.

### Parâmetros

- **ap** — um objeto do tipo [va_list](<#/doc/utility/variadic/va_list>)
- **parm_n** — o parâmetro nomeado que precede o primeiro parâmetro variável

### Valor expandido

(nenhum)

### Notas

`va_start` é exigida para suportar parm_n com `operator&` sobrecarregado.

### Exemplo

Execute este código
```cpp
    #include <cstdarg>
    #include <iostream>
     
    int add_nums(int count...)
    {
        int result = 0;
        std::va_list args;
        va_start(args, count);
        for (int i = 0; i < count; ++i)
            result += va_arg(args, int);
        va_end(args);
        return result;
    }
     
    int main()
    {
        std::cout << add_nums(4, 25, 25, 50, 50) << '\n';
    }
```

Saída:
```
    150
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 273](<https://cplusplus.github.io/CWG/issues/273.html>) | C++98 | não estava claro se `va_start` é exigida para
suportar parm_ns com `operator&` sobrecarregado | exigido
[LWG 2099](<https://cplusplus.github.io/LWG/issue2099>) | C++98 | o comportamento era indefinido se parm_n fosse
declarado com um tipo de função, array ou referência | o comportamento é indefinido se
parm_n for do tipo referência

### Veja também

[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádico
(macro de função)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos
(macro de função)
[documentação C](<#/>) para va_start