# std::basic_ios&lt;CharT,Traits&gt;::basic_ios

```cpp
protected:
basic_ios();  // (1)
public:
explicit basic_ios( std::basic_streambuf<CharT, Traits>* sb );  // (2)
  // (3)
private:
basic_ios( const basic_ios& );  // (until C++11)
public:
basic_ios( const basic_ios& ) = delete;  // (since C++11)
```

  
Constrói um novo objeto `std::basic_ios`.

1) Construtor padrão. O estado interno não é inicializado. [init()](<#/doc/io/basic_ios/init>) deve ser chamado antes do primeiro uso do objeto ou antes do destrutor, caso contrário, o comportamento é indefinido.

2) Inicializa o estado interno chamando init(sb). O stream buffer associado é definido como sb.

3) O construtor de cópia é declarado privado e não definido (até C++11) explicitamente definido como deletado (desde C++11): streams de E/S não são [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

sb  |  \-  |  stream buffer a ser associado   
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 1249](<https://cplusplus.github.io/LWG/issue1249>) | C++98  | estado interno não precisava ser inicializado antes do primeiro uso  | também precisa ser inicializado 