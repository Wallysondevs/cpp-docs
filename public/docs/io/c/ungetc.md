# std::ungetc

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int ungetc( int ch, std::FILE *stream );
```

Se `ch` não for igual a [EOF](<#/doc/io/c>), empurra o caractere `ch` (reinterpretado como unsigned char) para o buffer de entrada associado ao stream `stream` de tal forma que uma operação de leitura subsequente de `stream` recuperará esse caractere. O dispositivo externo associado ao stream não é modificado.

Operações de reposicionamento de stream como [std::fseek](<#/doc/io/c/fseek>), [std::fsetpos](<#/doc/io/c/fsetpos>) e [std::rewind](<#/doc/io/c/rewind>) descartam os efeitos de `ungetc`.

Se `ungetc` for chamado mais de uma vez sem uma leitura ou reposicionamento intermediário, ele pode falhar (em outras palavras, um buffer de pushback de tamanho 1 é garantido, mas qualquer buffer maior é definido pela implementação). Se múltiplas chamadas bem-sucedidas de `ungetc` foram realizadas, as operações de leitura recuperam os caracteres empurrados de volta na ordem inversa de `ungetc`.

Se `ch` for igual a [EOF](<#/doc/io/c>), a operação falha e o stream não é afetado.

Uma chamada bem-sucedida a `ungetc` limpa o flag de status de fim de arquivo [std::feof](<#/doc/io/c/feof>).

Uma chamada bem-sucedida a `ungetc` em um stream binário decrementa o indicador de posição do stream em um (o comportamento é indeterminado se o indicador de posição do stream era zero).

Uma chamada bem-sucedida a `ungetc` em um stream de texto modifica o indicador de posição do stream de maneira não especificada, mas garante que, após todos os caracteres empurrados de volta serem recuperados com uma operação de leitura, o indicador de posição do stream seja igual ao seu valor antes de `ungetc`.

### Parâmetros

- **ch** — caractere a ser empurrado para o buffer do stream de entrada
- **stream** — stream de arquivo para o qual o caractere será devolvido

### Valor de retorno

Em caso de sucesso, `ch` é retornado.

Em caso de falha, [EOF](<#/doc/io/c>) é retornado e o stream fornecido permanece inalterado.

### Notas

O tamanho do buffer de pushback varia na prática de 4k (Linux, MacOS) para tão pouco quanto 4 (Solaris) ou o mínimo garantido de 1 (HPUX, AIX).

O tamanho aparente do buffer de pushback pode ser maior se o caractere que é empurrado de volta for igual ao caractere existente naquela localização na sequência de caracteres externa (a implementação pode simplesmente decrementar o indicador de posição de leitura do arquivo e evitar manter um buffer de pushback).

### Exemplo

demonstra o uso de `std::ungetc` em seu propósito original: implementar [std::scanf](<#/doc/io/c/scanf>)

Execute este código
```cpp
    #include <cctype>
    #include <cstdio>
    
    void demo_scanf(const char* fmt, std::FILE* s)
    {
        while (*fmt != '\0') {
            if (*fmt == '%') {
                switch (*++fmt) {
                    case 'u': {
                        int c{};
                        while (std::isspace(c=std::getc(s))) {}
                        unsigned int num{};
                        while (std::isdigit(c)) {
                            num = num*10 + c-'0';
                            c = std::getc(s);
                        }
                        std::printf("%%u scanned %u\n", num);
                        std::ungetc(c, s);
                        break;
                    }
                    case 'c': {
                        int c = std::getc(s);
                        std::printf("%%c scanned '%c'\n", c);
                        break;
                    }
                }
            } else {
                ++fmt;
            }
        }
    }
    
    int main()
    {
        if (std::FILE* f = std::fopen("input.txt", "w+")) {
            std::fputs("123x", f);
            std::rewind(f);
            demo_scanf("%u%c", f);
            std::fclose(f);
        }
    }
```

Saída:
```
    %u scanned 123
    %c scanned 'x'
```

### Veja também

[ fgetcgetc](<#/doc/io/c/fgetc>) | obtém um caractere de um stream de arquivo
(função)
[Documentação C](<#/>) para ungetc