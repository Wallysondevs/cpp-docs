# std::sub_match&lt;BidirIt&gt;::length

difference_type length() const;

Retorna o número de caracteres na correspondência.

### Valor de retorno

[std::distance](<#/doc/iterator/distance>)(first, second) se a correspondência for válida, ​0​ caso contrário.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::string sentence{"Quick red fox jumped over a lazy cow."};
        const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+) ([a-z]+)"};
        std::smatch words;
        std::regex_search(sentence, words, re);
        for (const auto& m : words)
            std::cout << '[' << m << "], length = " << m.length() << '\n';
    }
```

Saída:
```
    [Quick red fox jumped], length = 20
    [Quick], length = 5
    [red], length = 3
    [fox], length = 3
    [jumped], length = 6
```