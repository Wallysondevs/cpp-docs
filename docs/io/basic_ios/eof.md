# std::basic_ios&lt;CharT,Traits&gt;::eof

bool eof() const;

Retorna true se o stream associado atingiu o fim do arquivo. Especificamente, retorna true se `eofbit` estiver definido em [rdstate()](<#/doc/io/basic_ios/rdstate>).

Veja [`ios_base::iostate`](<#/doc/io/ios_base/iostate>) para a lista de condições que definem `eofbit`.

### Parâmetros

(nenhum)

### Valor de retorno

true se um fim de arquivo ocorreu, false caso contrário.

### Notas

Esta função apenas relata o estado do stream conforme definido pela operação de E/S mais recente; ela não examina a fonte de dados associada. Por exemplo, se a E/S mais recente foi um [`get()`](<#/doc/io/basic_istream/get>) que retornou o último byte de um arquivo, `eof()` retorna false. O próximo `get()` falha ao ler qualquer coisa e define o `eofbit`. Somente então `eof()` retorna true.

No uso típico, o processamento de stream de entrada para em qualquer erro. `eof()` e [fail()](<#/doc/io/basic_ios/fail>) podem então ser usados para distinguir entre diferentes condições de erro.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::ifstream file("test.txt");
        if (!file) // operator! is used here
        {  
            std::cout << "File opening failed\n";
            return EXIT_FAILURE;
        }
     
        // typical C++ I/O loop uses the return value of the I/O function
        // as the loop controlling condition, operator bool() is used here
        for (int n; file >> n;)
           std::cout << n << ' ';
        std::cout << '\n';
     
        if (file.bad())
            std::cout << "I/O error while reading\n";
        else if (file.eof())
            std::cout << "End of file reached successfully\n";
        else if (file.fail())
            std::cout << "Non-integer data encountered\n";
    }
```

### Veja também

A tabela a seguir mostra o valor dos acessadores de [`basic_ios`](<#/doc/io/basic_ios>) ([`good()`](<#/doc/io/basic_ios/good>), [`fail()`](<#/doc/io/basic_ios/fail>), etc.) para todas as combinações possíveis de flags de [`ios_base::iostate`](<#/doc/io/ios_base/iostate>):

flags de [`ios_base::iostate`](<#/doc/io/ios_base/iostate>) | acessadores de `basic_ios`
---|---|---|---|---|---|---|---|---
`eofbit` | `failbit` | `badbit` | [`good()`](<#/doc/io/basic_ios/good>) | [`fail()`](<#/doc/io/basic_ios/fail>) | [`bad()`](<#/doc/io/basic_ios/bad>) | `eof()` | [`operator bool`](<#/doc/io/basic_ios/operator_bool>) | [`operator!`](<#/>)
false | false | false | true | false | false | false | true | false
false | false | true | false | true | true | false | false | true
false | true | false | false | true | false | false | false | true
false | true | true | false | true | true | false | false | true
true | false | false | false | false | false | true | true | false
true | false | true | false | true | true | true | false | true
true | true | false | false | true | false | true | false | true
true | true | true | false | true | true | true | false | true
[ feof](<#/doc/io/c/feof>) | verifica o fim do arquivo
(function)