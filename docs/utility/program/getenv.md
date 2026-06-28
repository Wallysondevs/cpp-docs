# std::getenv

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
char* getenv( const char* env_var );
```

Procura na _lista de ambiente_ fornecida pelo ambiente hospedeiro (o SO), por uma string que corresponde à string C apontada por `env_var` e retorna um ponteiro para a string C que está associada ao membro da lista de ambiente correspondente.

Esta função não é exigida ser thread-safe. Outra chamada a `getenv`, bem como uma chamada às funções POSIX [`setenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/setenv.html>), [`unsetenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/unsetenv.html>), e [`putenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/putenv.html>) pode invalidar o ponteiro retornado por uma chamada anterior ou modificar a string obtida de uma chamada anterior. | (ate C++11)
---|---
Esta função é thread-safe (chamá-la de múltiplas threads não introduz uma data race) desde que nenhuma outra função modifique o ambiente hospedeiro. Em particular, as funções POSIX [`setenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/setenv.html>), [`unsetenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/unsetenv.html>), e [`putenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/putenv.html>) introduziriam uma data race se chamadas sem sincronização. | (desde C++11)

Modificar a string retornada por `getenv` invoca comportamento indefinido.

### Parâmetros

- **env_var** — string de caracteres terminada em nulo identificando o nome da variável de ambiente a ser procurada

### Valor de retorno

String de caracteres identificando o valor da variável de ambiente ou ponteiro nulo se tal variável não for encontrada.

### Observações

Em sistemas POSIX, as [variáveis de ambiente](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap08.html#tag_08>) também são acessíveis através da variável global `environ`, declarada como extern char** environ; em `<unistd.h>`, e através do terceiro argumento opcional, `envp`, da [função main](<#/doc/language/main_function>).

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
     
    int main()
    {
        if (const char* env_p = std::getenv("PATH"))
            std::cout << "Your PATH is: " << env_p << '\n';
    }
```

Saída possível:
```
    Your PATH is: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
```

### Veja também

[Documentação C](<#/>) para getenv
---