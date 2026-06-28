# Cabeçalho da biblioteca padrão &lt;cctype&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<ctype.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [strings de bytes terminadas em nulo](<#/doc/string/byte>).

### Funções

---
[ isalnum](<#/doc/string/byte/isalnum>) | verifica se um caractere é alfanumérico
(função)
[ isalpha](<#/doc/string/byte/isalpha>) | verifica se um caractere é alfabético
(função)
[ islower](<#/doc/string/byte/islower>) | verifica se um caractere é minúsculo
(função)
[ isupper](<#/doc/string/byte/isupper>) | verifica se um caractere é maiúsculo
(função)
[ isdigit](<#/doc/string/byte/isdigit>) | verifica se um caractere é um dígito
(função)
[ isxdigit](<#/doc/string/byte/isxdigit>) | verifica se um caractere é um caractere hexadecimal
(função)
[ iscntrl](<#/doc/string/byte/iscntrl>) | verifica se um caractere é um caractere de controle
(função)
[ isgraph](<#/doc/string/byte/isgraph>) | verifica se um caractere é um caractere gráfico
(função)
[ isspace](<#/doc/string/byte/isspace>) | verifica se um caractere é um caractere de espaço
(função)
[ isblank](<#/doc/string/byte/isblank>)(desde C++11) | verifica se um caractere é um caractere em branco
(função)
[ isprint](<#/doc/string/byte/isprint>) | verifica se um caractere é um caractere imprimível
(função)
[ ispunct](<#/doc/string/byte/ispunct>) | verifica se um caractere é um caractere de pontuação
(função)
[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúsculo
(função)
[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúsculo
(função)

### Sinopse
```cpp
    namespace std {
      int isalnum(int c);
      int isalpha(int c);
      int isblank(int c);
      int iscntrl(int c);
      int isdigit(int c);
      int isgraph(int c);
      int islower(int c);
      int isprint(int c);
      int ispunct(int c);
      int isspace(int c);
      int isupper(int c);
      int isxdigit(int c);
      int tolower(int c);
      int toupper(int c);
    }
```