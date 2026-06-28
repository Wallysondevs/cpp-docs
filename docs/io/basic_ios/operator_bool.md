# std::basic_ios&lt;CharT,Traits&gt;::operator bool

```cpp
operator /* unspecified-boolean-type */() const;  // (1) (até C++11)
explicit operator bool() const;  // (2) (desde C++11)
```

Verifica se o stream não possui erros.

1) Retorna um valor que avalia para `false` em um contexto booleano se `fail()` retornar `true`, caso contrário retorna um valor que avalia para `true` em um contexto booleano.

2) Retorna `true` se o stream não possui erros e está pronto para operações de I/O. Especificamente, retorna `!fail()`.

Este operador possibilita o uso de streams e funções que retornam referências a streams como condições de loop, resultando em loops de entrada idiomáticos de C++ como `while (stream >> value) {...}` ou `while ([std::getline](<#/doc/string/basic_string/getline>)(stream, string)) {...}`. Tais loops executam o corpo do loop apenas se a operação de entrada for bem-sucedida.

### Parâmetros

(nenhum)

### Valor de retorno

1) Um valor que avalia para `true` em um contexto booleano se o stream não possui erros, um valor que avalia para `false` em um contexto booleano caso contrário.

2) `true` se o stream não possui erros, `false` caso contrário.

### Notas

Esta conversão pode ser usada em contextos onde um `bool` é esperado (por exemplo, uma [condição `if`](<#/doc/language/if>)). No entanto, [conversões implícitas](<#/doc/language/implicit_cast>) (por exemplo, para `int`) que podem ocorrer com `bool` não são permitidas.

Em C++98, `operator bool` não podia ser fornecido diretamente devido ao [problema do safe bool](<#/doc/language/implicit_cast>). A solução inicial em C++98 é fornecer `operator void*`, que retorna um ponteiro nulo se `fail()` retornar `true` ou um ponteiro não nulo caso contrário. Foi substituído pela resolução do [LWG issue 468](<https://cplusplus.github.io/LWG/issue468>), que permite a aplicação do [idioma Safe Bool](<https://en.wikibooks.org/wiki/More_C%2B%2B_Idioms/Safe_bool>).

Desde C++11, funções de conversão podem ser [`explicit`](<#/doc/language/explicit>). A resolução do [LWG issue 1094](<https://cplusplus.github.io/LWG/issue1094>) introduziu o `explicit operator bool` e a conversão booleana agora é segura.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s("1 2 3 error");
        int n;
     
        std::cout << std::boolalpha << "s is " << static_cast<bool>(s) << '\n';
        while (s >> n)
            std::cout << n << '\n';
        std::cout << "s is " << static_cast<bool>(s) << '\n';
    }
```

Saída:
```
    s is true
    1
    2
    3
    s is false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 468](<https://cplusplus.github.io/LWG/issue468>) | C++98 | `operator void*` foi fornecido | uma função de conversão para um tipo booleano não especificado é fornecida em vez disso

### Ver também

A tabela a seguir mostra o valor dos acessadores de [`basic_ios`](<#/doc/io/basic_ios>) (`good()`, `fail()`, etc.) para todas as combinações possíveis de flags de [`ios_base::iostate`](<#/doc/io/ios_base/iostate>):

[`ios_base::iostate`](<#/doc/io/ios_base/iostate>) flags | `basic_ios` accessors
---|---|---|---|---|---|---|---|---
`eofbit` | `failbit` | `badbit` | [`good()`](<#/doc/io/basic_ios/good>) | [`fail()`](<#/doc/io/basic_ios/fail>) | [`bad()`](<#/doc/io/basic_ios/bad>) | [`eof()`](<#/doc/io/basic_ios/eof>) | `operator bool` | [`operator!`](<#/>)
false | false | false | true | false | false | false | true | false
false | false | true | false | true | true | false | false | true
false | true | false | false | true | false | false | false | true
false | true | true | false | true | true | false | false | true
true | false | false | false | false | false | true | true | false
true | false | true | false | true | true | true | false | true
true | true | false | false | true | false | true | false | true
true | true | true | false | true | true | true | false | true