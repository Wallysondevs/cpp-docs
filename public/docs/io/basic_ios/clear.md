# std::basic_ios&lt;CharT,Traits&gt;::clear

void clear( [std::ios_base::iostate](<#/doc/io/ios_base/iostate>) state = [std::ios_base::goodbit](<#/doc/io/ios_base/iostate>) );

  
Define os flags de estado de erro do stream atribuindo-lhes o valor de `state`. Por padrão, atribui [std::ios_base::goodbit](<#/doc/io/ios_base/iostate>), o que tem o efeito de limpar todos os flags de estado de erro. 

Se [rdbuf()](<#/doc/io/basic_ios/rdbuf>) for um ponteiro nulo (ou seja, não houver um buffer de stream associado), então `state | [std::ios_base::badbit](<#/doc/io/ios_base/iostate>)` é atribuído. 

### Parâmetros

state  |  \-  |  nova configuração dos flags de estado de erro. Pode ser uma combinação das seguintes constantes:  |  Constante  |  Explicação   
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) |  sem erro   
[`badbit`](<#/doc/io/ios_base/iostate>) |  erro de stream irrecuperável   
[`failbit`](<#/doc/io/ios_base/iostate>) |  operação de entrada/saída falhou (erro de formatação ou extração)   
[`eofbit`](<#/doc/io/ios_base/iostate>) |  sequência de entrada associada atingiu o fim de arquivo   
  
### Valor de retorno

(nenhum) 

### Exceções

Se o novo estado de erro incluir um bit que também está incluído na máscara de [exceptions()](<#/doc/io/basic_ios/exceptions>), lança uma exceção do tipo [failure](<#/doc/io/ios_base/failure>). 

### Exemplo

`clear()` sem argumentos pode ser usado para desativar o [`failbit`](<#/doc/io/basic_ios/clear>) após uma entrada inesperada; para [std::cin](<#/doc/io/cin>).putback(c) veja [`ungetc`](<#/doc/io/c/ungetc>).

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        for (char c : {'\n', '4', '1', '.', '3', '\n', 'Z', 'Y', 'X'})
            std::cin.putback(c); // emulate user's input (not portable: see ungetc Notes)
    
        double n;
        while (std::cout << "Please, enter a number: " && !(std::cin >> n))
        {
            std::cin.clear();
            std::string line;
            std::getline(std::cin, line);
            std::cout << line << "\nI am sorry, but '" << line << "' is not a number\n";
        }
        std::cout << n << "\nThank you for entering the number " << n << '\n';
    }
```

Saída: 
```
    Please, enter a number: XYZ
    I am sorry, but 'XYZ' is not a number
    Please, enter a number: 3.14
    Thank you for entering the number 3.14
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 412](<https://cplusplus.github.io/LWG/issue412>) | C++98  | uma exceção seria lançada se o estado de erro atual  
incluísse um bit que também está incluído na máscara de [exceptions()](<#/doc/io/basic_ios/exceptions>)  | verifica o novo  
estado de erro em vez disso   
  
### Veja também

[ setstate](<#/doc/io/basic_ios/setstate>) |  define flags de estado   
(função membro pública)  
[ rdstate](<#/doc/io/basic_ios/rdstate>) |  retorna flags de estado   
(função membro pública)