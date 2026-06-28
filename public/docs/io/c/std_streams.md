# stdin, stdout, stderr

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
#define stdin /* implementation-defined */
#define stdout /* implementation-defined */
#define stderr /* implementation-defined */
```

Três streams de texto são predefinidos. Esses streams são implicitamente abertos e não orientados na inicialização do programa.

1) Associado ao stream de _entrada padrão_, usado para leitura de entrada convencional. Na inicialização do programa, o stream é totalmente armazenado em buffer (fully buffered) se e somente se for determinado que o stream não se refere a um dispositivo interativo.

2) Associado ao stream de _saída padrão_, usado para escrita de saída convencional. Na inicialização do programa, o stream é totalmente armazenado em buffer se e somente se for determinado que o stream não se refere a um dispositivo interativo.

3) Associado ao stream de _erro padrão_, usado para escrita de saída de diagnóstico. Na inicialização do programa, o stream não é totalmente armazenado em buffer.

O que constitui um dispositivo interativo é definido pela implementação.

Essas macros são expandidas para expressões do tipo [std::FILE](<#/doc/io/c/FILE>)*.

### Notas

Embora não seja exigido pelo POSIX, a convenção UNIX é que `stdin` e `stdout` são line-buffered (armazenados em buffer por linha) se associados a um terminal e `stderr` é unbuffered (não armazenado em buffer).

Essas macros podem ser expandidas para lvalues modificáveis. Se qualquer um desses lvalues [std::FILE](<#/doc/io/c/FILE>)* for modificado, operações subsequentes no stream correspondente resultam em comportamento não especificado ou indefinido.

### Exemplo

Este exemplo mostra uma função similar a [std::printf](<#/doc/io/c/printf>).

Execute este código
```cpp
    #include <concepts>
    #include <cstdio>
    #include <type_traits>
    
    template<typename T>
    concept IsPrintable = std::integral<T> or std::floating_point<T> or std::is_pointer_v<T>;
    
    int my_printf(char const* const format, IsPrintable auto const ... arguments)
    {
        return std::fprintf(stdout, format, arguments...);
    }
    
    int main(int argv, char*[])
    {
        my_printf("Strings and chars:\t%s %c\n", "hello", 'x');
        my_printf("Rounding:\t\t%f %.0f %.32f\n", 1.5, 1.5, 1.3);
        my_printf("Padding:\t\t%05.2f %.2f %5.2f\n", 1.5, 1.5, 1.5);
        my_printf("Scientific:\t\t%E %e\n", 1.5, 1.5);
        my_printf("Hexadecimal:\t\t%a %A 0x%X\n", 1.5, 1.5, &argv);
    }
```

Saída possível:
```
    Strings and chars:  hello x
    Rounding:           1.500000 2 1.30000000000000004440892098500626
    Padding:            01.50 1.50  1.50
    Scientific:         1.500000E+00 1.500000e+00
    Hexadecimal:        0x1.8p+0 0X1.8P+0 0x2CFB41BC
```

### Veja também

[ cinwcin](<#/doc/io/cin>) | lê do stream de entrada C padrão **stdin**
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão **stdout**
(objeto global)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão **stderr** , unbuffered (não armazenado em buffer)
(objeto global)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão **stderr**
(objeto global)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para **stdout** , um stream de arquivo ou um buffer
(função)
[ FILE](<#/doc/io/c/FILE>) | tipo de objeto, capaz de conter todas as informações necessárias para controlar um stream de E/S C
(typedef)
[Documentação C](<#/>) para stdin, stdout, stderr