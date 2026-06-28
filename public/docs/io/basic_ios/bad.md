# std::basic_ios&lt;CharT,Traits&gt;::bad

bool bad() const;

  
Retorna true se um erro não recuperável ocorreu no stream associado. Especificamente, retorna true se [`badbit`](<#/doc/io/ios_base/iostate>) estiver definido em rdstate(). 

Veja [`ios_base::iostate`](<#/doc/io/ios_base/iostate>) para a lista de condições que definem `badbit`. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se um erro não recuperável ocorreu, false caso contrário. 

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        std::ifstream file("test.txt");
        if (!file) // operator! é usado aqui
        {  
            std::cout << "File opening failed\n";
            return EXIT_FAILURE;
        }
    
        // o loop de E/S típico de C++ usa o valor de retorno da função de E/S
        // como condição de controle do loop; operator bool() é usado aqui
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

[`ios_base::iostate`](<#/doc/io/ios_base/iostate>) flags  |  `basic_ios` accessors   
---|---|---|---|---|---|---|---|---
`eofbit` |  `failbit` |  `badbit` |  [`good()`](<#/doc/io/basic_ios/good>) |  [`fail()`](<#/doc/io/basic_ios/fail>) |  `bad()` |  [`eof()`](<#/doc/io/basic_ios/eof>) |  [`operator bool`](<#/doc/io/basic_ios/operator_bool>) |  [`operator!`](<#/>)  
false  |  false  |  false  | true  |  false  |  false  |  false  | true  |  false   
false  |  false  | true  |  false  | true  | true  |  false  |  false  | true   
false  | true  |  false  |  false  | true  |  false  |  false  |  false  | true   
false  | true  | true  |  false  | true  | true  |  false  |  false  | true   
true  |  false  |  false  |  false  |  false  |  false  | true  | true  |  false   
true  |  false  | true  |  false  | true  | true  | true  |  false  | true   
true  | true  |  false  |  false  | true  |  false  | true  |  false  | true   
true  | true  | true  |  false  | true  | true  | true  |  false  | true 