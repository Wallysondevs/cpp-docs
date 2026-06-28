# std::basic_string&lt;CharT,Traits,Allocator&gt;::npos

static const size_type npos = -1;

  
Este é um valor especial igual ao valor máximo representável pelo tipo [`size_type`](<#/doc/string/basic_string>). O significado exato depende do contexto, mas é geralmente usado como um indicador de fim de string pelas funções que esperam um índice de string ou como um indicador de erro pelas funções que retornam um índice de string.

### Nota

Embora a definição use -1, `size_type` é um tipo inteiro sem sinal, e o valor de `npos` é o maior valor positivo que ele pode conter, devido à [conversão implícita de assinado para sem sinal](<#/doc/language/implicit_cast>). Esta é uma maneira portátil de especificar o maior valor de qualquer tipo sem sinal.

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
    #include <string>
     
    int main()
    {
        // string search functions return npos if nothing is found
        std::string s = "test";
        if (s.find('a') == s.npos)
            std::cout << "no 'a' in 'test'\n";
     
        // functions that take string subsets as arguments 
        // use npos as the "all the way to the end" indicator
        std::string s2(s, 2, std::string::npos);
        std::cout << s2 << '\n';
     
        std::bitset<5> b("aaabb", std::string::npos, 'a', 'b');
        std::cout << b << '\n';
    }
```

Saída: 
```
    no 'a' in 'test'
    st
    00011
```

### Veja também

[ npos](<#/doc/string/basic_string_view/npos>)[static] |  valor especial. O significado exato depende do contexto   
(constante membro estática pública de `std::basic_string_view<CharT,Traits>`)  