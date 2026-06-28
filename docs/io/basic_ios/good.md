# std::basic_ios&lt;CharT,Traits&gt;::good

bool good() const;

  
Retorna true se a operação de E/S mais recente no stream foi concluída com sucesso. Especificamente, retorna o resultado de rdstate() == 0. 

Veja [`ios_base::iostate`](<#/doc/io/ios_base/iostate>) para a lista de condições que definem os bits de status do stream. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se todos os flags de erro do stream forem false, false caso contrário. 

### Exemplo

Execute este código
```
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        const char* fname = "/tmp/test.txt";
        std::ofstream ofile{fname};
        ofile << "10 " << "11 " << "12 " << "non-int";
        ofile.close();
     
        std::ifstream file{fname};
        if (!file.good())  
        {  
            std::cout << "#1. Opening file test.txt failed - "
                         "one of the error flags is true\n";
            return EXIT_FAILURE;
        }
     
        // typical C++ I/O loop uses the return value of the I/O function
        // as the loop controlling condition, operator bool() is used here
        for (int n; file >> n;)
            std::cout << n << ' ';
        std::cout << '\n';
     
        if (file.bad()) 
        {
            std::cout << "#2. I/O error while reading - badbit is true\n";
            return EXIT_FAILURE;
        } 
        else if (file.eof())
            std::cout << "#3. End of file reached successfully - eofbit is true\n"
                "This is fine even though file.good() is false\n"; 
        else if (file.fail())
            std::cout << "#4. Non-integer data encountered - failbit is true\n";
    }
```

Saída possível: 
```
    10 11 12 
    #4. Non-integer data encountered - failbit is true
```

### Veja também

A tabela a seguir mostra o valor dos acessadores de [`basic_ios`](<#/doc/io/basic_ios>) (`good()` , [`fail()`](<#/doc/io/basic_ios/fail>), etc.) para todas as combinações possíveis de flags de [`ios_base::iostate`](<#/doc/io/ios_base/iostate>): 

Flags de [`ios_base::iostate`](<#/doc/io/ios_base/iostate>)  |  Acessadores de `basic_ios`   
---|---|---|---|---|---|---|---|---
`eofbit` |  `failbit` |  `badbit` |  `good()` |  [`fail()`](<#/doc/io/basic_ios/fail>) |  [`bad()`](<#/doc/io/basic_ios/bad>) |  [`eof()`](<#/doc/io/basic_ios/eof>) |  [`operator bool`](<#/doc/io/basic_ios/operator_bool>) |  [`operator!`](<#/>)  
false  |  false  |  false  | true  |  false  |  false  |  false  | true  |  false   
false  |  false  | true  |  false  | true  | true  |  false  |  false  | true   
false  | true  |  false  |  false  | true  |  false  |  false  |  false  | true   
false  | true  | true  |  false  | true  | true  |  false  |  false  | true   
true  |  false  |  false  |  false  |  false  |  false  | true  | true  |  false   
true  |  false  | true  |  false  | true  | true  | true  |  false  | true   
true  | true  |  false  |  false  | true  |  false  | true  |  false  | true   
true  | true  | true  |  false  | true  | true  | true  |  false  | true 