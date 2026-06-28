# std::ios_base::ios_base

```cpp
  // (1)
private:
ios_base( const ios_base& );  // (até C++11)
public:
ios_base( const ios_base& ) = delete;  // (desde C++11)
protected:
ios_base();  // (2)
```

  
1) O construtor de cópia é privado (até C++11) deletado (desde C++11): streams não são copiáveis.

2) O construtor padrão é protected: apenas classes derivadas podem construir `std::ios_base`. O estado interno é indefinido após a construção. A classe derivada deve chamar [`std::basic_ios::init()`](<#/doc/io/basic_ios/init>) para completar a inicialização antes do primeiro uso ou antes do destrutor; caso contrário, o comportamento é indefinido.

### Notas

O mesmo se aplica aos construtores da próxima classe na hierarquia de E/S, [std::basic_ios](<#/doc/io/basic_ios>). Classes mais derivadas ([std::istream](<#/doc/io/basic_istream>) e [std::ostream](<#/doc/io/basic_ostream>)) são sempre construídas com um objeto stream buffer concreto e chamam [`std::basic_ios::init()`](<#/doc/io/basic_ios/init>), possivelmente mais de uma vez, para completar a inicialização de sua base virtual. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 50](<https://cplusplus.github.io/LWG/issue50>) | C++98  | o construtor de cópia não foi especificado  | especificado como private   
[LWG 220](<https://cplusplus.github.io/LWG/issue220>) | C++98  | o comportamento de destruir um objeto `std::ios_base`  
antes de chamar seu [`init()`](<#/doc/io/basic_ios/init>) não era claro  | o comportamento é  
indefinido neste caso   
[LWG 1249](<https://cplusplus.github.io/LWG/issue1249>) | C++98  | a inicialização não precisava ser completada antes do primeiro uso  | também precisa ser completada 