# std::basic_regex&lt;CharT,Traits&gt;::mark_count

unsigned mark_count() const; |  |  (desde C++11)  

  
Retorna o número de subexpressões marcadas (também conhecidas como grupos de captura) dentro da expressão regular. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de subexpressões marcadas dentro da expressão regular. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    
    int main()
    {    
        std::regex r1{"abcde"};
        std::cout << "r1 has " << r1.mark_count() << " subexpressions" << '\n';
        // Expected: 0
    
        std::regex r2{"ab(c)de"};
        std::cout << "r2 has " << r2.mark_count() << " subexpressions" << '\n';
        // Expected: 1
    
        std::regex r3{"a(bc)d(e)"}; 
        std::cout << "r3 has " << r3.mark_count() << " subexpressions" << '\n';
        // Expected: 2
    
        // Nested sub-expressions
        std::regex r4{"abc(de(fg))"};
        std::cout << "r4 has " << r4.mark_count() << " subexpressions" << '\n';
        // Expected: 2
    
        // Escaped parentheses
        std::regex r5{"a(bc\\(\\)de)"};
        std::cout << "r5 has " << r5.mark_count() << " subexpressions" << '\n';
        // Expected: 1
    
        // Using nosubs flag
        std::regex r6{"ab(c)de", std::regex_constants::nosubs};
        std::cout << "r6 has " << r6.mark_count() << " subexpressions" << '\n';
        // Expected: 0
    }
```

Saída: 
```
    r1 has 0 subexpressions
    r2 has 1 subexpressions
    r3 has 2 subexpressions
    r4 has 2 subexpressions
    r5 has 1 subexpressions
    r6 has 0 subexpressions
```