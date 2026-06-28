# std::va_list

Definido no cabeçalho `[<cstdarg>](<#/doc/header/cstdarg>)`

```c
typedef /* unspecified */ va_list;
```

`va_list` é um tipo de objeto completo (na prática, um tipo embutido único ou char*) adequado para armazenar as informações necessárias pelas macros [va_start](<#/doc/utility/variadic/va_start>), [va_copy](<#/doc/utility/variadic/va_copy>), [va_arg](<#/doc/utility/variadic/va_arg>), e [va_end](<#/doc/utility/variadic/va_end>).

Se uma instância de `va_list` for criada, passada para outra função e usada via [va_arg](<#/doc/utility/variadic/va_arg>) nessa função, então qualquer uso subsequente na função chamadora deve ser precedido por uma chamada a [va_end](<#/doc/utility/variadic/va_end>).

É legal passar um ponteiro para um objeto `va_list` para outra função e então usar esse objeto após o retorno da função.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ va_start](<#/doc/utility/variadic/va_start>) | permite acesso a argumentos de função variádicos
(macro de função)
[ va_copy](<#/doc/utility/variadic/va_copy>)(C++11) | faz uma cópia dos argumentos de função variádicos
(macro de função)
[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádico
(macro de função)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos
(macro de função)
[Documentação C](<#/>) para va_list