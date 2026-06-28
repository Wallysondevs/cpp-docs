# std::fpos&lt;State&gt;::state

```cpp
State state() const;  // (1)
void state( State st );  // (2)
```

  
Gerencia o estado da posição do arquivo.

1) Retorna o valor do estado da posição do arquivo.

2) Substitui o estado da posição do arquivo pelo valor de st.

Para as especializações de [std::fpos](<#/doc/io/fpos>) que são usadas na standard library, `State` é sempre [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>). 

### Parâmetros

st  |  \-  |  novo valor para o estado   
  
### Valor de retorno

1) O valor atual do estado `fpos`.

2) (nenhum)

### Exemplo

Execute este código
```cpp 
    #include <cwchar>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::istringstream s("test");
        std::mbstate_t st = s.tellg().state();
    
        if (std::mbsinit(&st))
            std::cout << "The stream is in the initial shift state\n";
    }
```

Saída: 
```
    The stream is in the initial shift state
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 441](<https://cplusplus.github.io/LWG/issue441>) | C++98  | a sobrecarga (1) não foi declarada const (é const na [sinopse](<#/doc/header/ios>))  | const adicionado  
  
### Veja também

[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) |  informações de estado de conversão necessárias para iterar strings de caracteres multibyte   
(classe)  