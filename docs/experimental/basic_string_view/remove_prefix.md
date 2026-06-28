# std::experimental::basic_string_view&lt;CharT,Traits&gt;::remove_prefix

constexpr void remove_prefix(size_type n); |  |  (TS de Fundamentos da Biblioteca)  

  
Move o início da view para frente em `n` caracteres.

O comportamento é indefinido se n > size().

### Parâmetros

n  |  \-  |  número de caracteres a remover do início da view   
  
### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <experimental/string_view>
    int main()
    {
        std::string str = "   trim me";
        std::experimental::string_view v = str;
        v.remove_prefix(std::min(v.find_first_not_of(" "), v.size()));
        std::cout << "String: '" << str << "'\n"
                  << "View  : '" << v << "'\n";
    }
```

Saída: 
```
    String: '   trim me'
    View  : 'trim me'
```

### Ver também

[ remove_suffix](<#/doc/experimental/basic_string_view/remove_suffix>) |  encolhe a view movendo seu fim para trás   
(função membro pública)  